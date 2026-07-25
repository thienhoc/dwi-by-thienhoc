#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
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

const temporaryRoot = await mkdtemp(
  path.join(os.tmpdir(), "dwi-install-contract-"),
);

try {
  const catalog = JSON.parse(
    await readFile(path.join(repositoryRoot, "modules", "catalog.json"), "utf8"),
  );

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
    assert.match(
      sourceMetadata,
      /allow_implicit_invocation:\s*false/,
      `${moduleId}: Codex metadata does not disable implicit invocation`,
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

    const overwriteRun = runInstaller("claude", moduleId, claudeTarget);
    assert.notEqual(
      overwriteRun.status,
      0,
      `${moduleId}: installer overwrote an existing target`,
    );
  }

  console.log(
    `Install contract passed for ${catalog.modules.length} module(s) across Codex and Claude Code.`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
