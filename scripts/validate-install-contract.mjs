#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(scriptPath), "..");
const installerPath = path.join(repositoryRoot, "scripts", "install-module.mjs");

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function runInstaller(harness, moduleId, target) {
  return spawnSync(process.execPath, [installerPath, harness, moduleId, target], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
}

function requireText(content, expected, source) {
  assert.ok(
    content.includes(expected),
    `${source}: missing required text ${JSON.stringify(expected)}`,
  );
}

function forbidText(content, forbidden, source) {
  assert.ok(
    !content.includes(forbidden),
    `${source}: contains stale text ${JSON.stringify(forbidden)}`,
  );
}

function removeClaudeInvocationField(rendered, sourcePath) {
  const match = rendered.match(/^---(\r?\n)([\s\S]*?)(\r?\n)---(\r?\n|$)/);
  assert.ok(match, `${sourcePath}: rendered Claude artifact has invalid frontmatter`);

  const lines = match[2].split(/\r?\n/);
  const matches = lines.filter(
    (line) => line.trim() === "disable-model-invocation: true",
  );
  assert.equal(
    matches.length,
    1,
    `${sourcePath}: expected exactly one disable-model-invocation: true field`,
  );

  const filtered = lines.filter(
    (line) => line.trim() !== "disable-model-invocation: true",
  );
  const body = rendered.slice(match[0].length);
  return `---${match[1]}${filtered.join(match[1])}${match[3]}---${match[4]}${body}`;
}

async function validateDocumentation() {
  const surfaces = [
    {
      path: "docs/installation.md",
      required: [
        "## Important activation-policy correction",
        "The installation examples published in `v0.1.0` through `v0.2.1` copied only `SKILL.md`.",
        "node scripts/install-module.mjs codex",
        "node scripts/install-module.mjs claude",
        "allow_implicit_invocation: false",
        "disable-model-invocation: true",
        "Do not run the following affected pattern.",
        "## Repair an existing one-file install",
        "user-invocable-only",
        "scripts/validate-install-contract.mjs",
      ],
      forbidden: [
        "For Claude Code, change only the target root",
        "Then start a fresh Claude Code session and invoke `/dwi-conduct` or ask the harness to use the installed skill.",
      ],
    },
    {
      path: "docs/vi/installation.md",
      required: [
        "## Đính chính quan trọng về chính sách kích hoạt",
        "Các ví dụ cài đặt đã phát hành từ `v0.1.0` đến `v0.2.1` chỉ sao chép `SKILL.md`.",
        "node scripts/install-module.mjs codex",
        "node scripts/install-module.mjs claude",
        "allow_implicit_invocation: false",
        "disable-model-invocation: true",
        "Không chạy mẫu dưới đây.",
        "## Sửa một bản cài cũ chỉ có một file",
        "user-invocable-only",
        "scripts/validate-install-contract.mjs",
      ],
      forbidden: [
        "Với Claude Code, chỉ đổi gốc thư mục đích",
        "Sau đó mở một phiên Claude Code mới và gọi `/dwi-conduct` hoặc yêu cầu harness dùng mô-đun đã cài.",
      ],
    },
  ];

  for (const surface of surfaces) {
    const content = await readFile(path.join(repositoryRoot, surface.path), "utf8");
    for (const expected of surface.required) {
      requireText(content, expected, surface.path);
    }
    for (const forbidden of surface.forbidden) {
      forbidText(content, forbidden, surface.path);
    }
  }

  const readmeChecks = [
    ["README.md", "The one-file installation examples published in `v0.1.0` through `v0.2.1` did not preserve the explicit-only invocation policy."],
    ["README.vi.md", "Các ví dụ cài một file đã phát hành từ `v0.1.0` đến `v0.2.1` không giữ được chính sách chỉ kích hoạt khi gọi rõ."],
  ];

  for (const [relativePath, expected] of readmeChecks) {
    const content = await readFile(path.join(repositoryRoot, relativePath), "utf8");
    requireText(content, "node scripts/install-module.mjs codex", relativePath);
    requireText(content, "node scripts/install-module.mjs claude", relativePath);
    requireText(content, expected, relativePath);
  }
}

const temporaryRoot = await mkdtemp(
  path.join(os.tmpdir(), "dwi-install-contract-"),
);

try {
  await validateDocumentation();

  const catalog = JSON.parse(
    await readFile(path.join(repositoryRoot, "modules", "catalog.json"), "utf8"),
  );
  assert.ok(Array.isArray(catalog.modules), "modules/catalog.json: modules must be an array");
  assert.ok(catalog.modules.length > 0, "modules/catalog.json: no modules found");

  for (const entry of catalog.modules) {
    const moduleId = entry.id;
    const sourceDirectory = path.join(repositoryRoot, "modules", moduleId);
    const sourceSkill = await readFile(
      path.join(sourceDirectory, "SKILL.md"),
      "utf8",
    );
    const sourceMetadata = await readFile(
      path.join(sourceDirectory, "agents", "openai.yaml"),
      "utf8",
    );

    assert.doesNotMatch(
      sourceSkill,
      /^disable-model-invocation\s*:/m,
      `${moduleId}: canonical SKILL.md must remain provider-neutral`,
    );
    assert.equal(
      (sourceMetadata.match(/allow_implicit_invocation:\s*false/g) ?? []).length,
      1,
      `${moduleId}: Codex metadata must contain exactly one explicit-only policy`,
    );

    const codexTarget = path.join(temporaryRoot, "codex", moduleId);
    const codexRun = runInstaller("codex", moduleId, codexTarget);
    assert.equal(
      codexRun.status,
      0,
      `${moduleId}: Codex install failed\n${codexRun.stderr}`,
    );
    assert.equal(
      await readFile(path.join(codexTarget, "SKILL.md"), "utf8"),
      sourceSkill,
      `${moduleId}: Codex SKILL.md drifted from canonical source`,
    );
    assert.equal(
      await readFile(path.join(codexTarget, "agents", "openai.yaml"), "utf8"),
      sourceMetadata,
      `${moduleId}: Codex openai.yaml drifted from canonical metadata`,
    );

    const codexOverwriteRun = runInstaller("codex", moduleId, codexTarget);
    assert.notEqual(
      codexOverwriteRun.status,
      0,
      `${moduleId}: Codex install overwrote an existing target`,
    );

    const claudeTarget = path.join(temporaryRoot, "claude", moduleId);
    const claudeRun = runInstaller("claude", moduleId, claudeTarget);
    assert.equal(
      claudeRun.status,
      0,
      `${moduleId}: Claude install failed\n${claudeRun.stderr}`,
    );
    const claudeSkill = await readFile(
      path.join(claudeTarget, "SKILL.md"),
      "utf8",
    );
    assert.equal(
      removeClaudeInvocationField(claudeSkill, `${moduleId}/SKILL.md`),
      sourceSkill,
      `${moduleId}: Claude artifact changed content beyond invocation metadata`,
    );
    assert.equal(
      await exists(path.join(claudeTarget, "agents", "openai.yaml")),
      false,
      `${moduleId}: Claude artifact must not include Codex-only metadata`,
    );

    const claudeOverwriteRun = runInstaller("claude", moduleId, claudeTarget);
    assert.notEqual(
      claudeOverwriteRun.status,
      0,
      `${moduleId}: Claude install overwrote an existing target`,
    );
  }

  const unknownRun = runInstaller(
    "codex",
    "dwi-not-a-module",
    path.join(temporaryRoot, "codex", "dwi-not-a-module"),
  );
  assert.notEqual(unknownRun.status, 0, "installer accepted an unknown module");

  const knownModule = catalog.modules[0].id;
  const wrongTargetRun = runInstaller(
    "claude",
    knownModule,
    path.join(temporaryRoot, "claude", "wrong-directory-name"),
  );
  assert.notEqual(
    wrongTargetRun.status,
    0,
    "installer accepted a target whose basename does not match the module id",
  );

  const leftovers = (await readdir(temporaryRoot, { recursive: true })).filter(
    (entry) => String(entry).includes(".dwi-install-"),
  );
  assert.deepEqual(leftovers, [], "installer left a staging directory behind");

  console.log(
    `Install contract passed for ${catalog.modules.length} module(s) across Codex and Claude Code, including documentation and failure-path checks.`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
