#!/usr/bin/env node

import { realpathSync } from "node:fs";
import {
  access,
  mkdir,
  readFile,
  realpath,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(scriptPath), "..");

function fail(message) {
  console.error(`Dwi install failed: ${message}`);
  process.exitCode = 1;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function canonicalizeProspectivePath(filePath) {
  const absolutePath = path.resolve(filePath);
  const missingSegments = [];
  let cursor = absolutePath;

  while (!(await exists(cursor))) {
    const parent = path.dirname(cursor);
    if (parent === cursor) {
      throw new Error(`unable to find an existing ancestor for ${absolutePath}`);
    }
    missingSegments.unshift(path.basename(cursor));
    cursor = parent;
  }

  const canonicalAncestor = await realpath(cursor);
  return path.join(canonicalAncestor, ...missingSegments);
}

function isSameOrDescendant(parentPath, candidatePath) {
  const relative = path.relative(parentPath, candidatePath);
  return (
    relative === "" ||
    (relative !== ".." &&
      !relative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relative))
  );
}

function parseYamlMappingEntry(body, sourcePath, lineNumber) {
  const doubleQuoted = body.match(/^"((?:[^"\\]|\\.)*)"\s*:(.*)$/);
  if (doubleQuoted) {
    let key;
    try {
      key = JSON.parse(`"${doubleQuoted[1]}"`);
    } catch {
      throw new Error(
        `${sourcePath}:${lineNumber}: invalid double-quoted YAML key`,
      );
    }
    return { key, rest: doubleQuoted[2], quoted: true };
  }

  const singleQuoted = body.match(/^'((?:[^']|'')*)'\s*:(.*)$/);
  if (singleQuoted) {
    return {
      key: singleQuoted[1].replace(/''/g, "'"),
      rest: singleQuoted[2],
      quoted: true,
    };
  }

  const plain = body.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:(.*)$/);
  if (plain) {
    return { key: plain[1], rest: plain[2], quoted: false };
  }

  return null;
}

function isYamlBlockMappingValue(rest) {
  return /^\s*(?:#.*)?$/.test(rest);
}

export function validateCodexMetadata(source, sourcePath) {
  if (typeof source !== "string") {
    throw new TypeError(`${sourcePath}: metadata must be UTF-8 text`);
  }

  const lines = source.split(/\r?\n/);
  const stack = [];
  const policyEntries = [];
  const invocationEntries = [];

  for (const [index, line] of lines.entries()) {
    const lineNumber = index + 1;
    if (/^\s*$/.test(line) || /^\s*#/.test(line)) continue;

    const leadingWhitespace = line.match(/^[ \t]*/)?.[0] ?? "";
    if (leadingWhitespace.includes("\t")) {
      throw new Error(
        `${sourcePath}:${lineNumber}: tabs are not allowed in YAML indentation`,
      );
    }

    const indent = leadingWhitespace.length;
    const body = line.slice(indent);

    while (stack.length > 0 && stack.at(-1).indent >= indent) {
      stack.pop();
    }

    const parent = stack.at(-1) ?? null;
    const entry = parseYamlMappingEntry(body, sourcePath, lineNumber);

    if (!entry) {
      if (
        body.includes("allow_implicit_invocation") ||
        body.includes("policy")
      ) {
        throw new Error(
          `${sourcePath}:${lineNumber}: unsupported YAML syntax around invocation policy`,
        );
      }
      continue;
    }

    const record = {
      ...entry,
      indent,
      line,
      lineNumber,
      parent,
    };

    if (entry.key === "policy") policyEntries.push(record);
    if (entry.key === "allow_implicit_invocation") {
      invocationEntries.push(record);
    }

    if (isYamlBlockMappingValue(entry.rest)) {
      stack.push({ key: entry.key, indent, lineNumber });
    }
  }

  if (policyEntries.length !== 1) {
    throw new Error(
      `${sourcePath}: expected exactly one top-level policy block`,
    );
  }

  const policy = policyEntries[0];
  if (
    policy.indent !== 0 ||
    policy.parent !== null ||
    policy.quoted ||
    !/^policy:\s*(?:#.*)?$/.test(policy.line)
  ) {
    throw new Error(
      `${sourcePath}:${policy.lineNumber}: policy must be one unquoted top-level block mapping`,
    );
  }

  if (invocationEntries.length !== 1) {
    throw new Error(
      `${sourcePath}: expected exactly one active allow_implicit_invocation declaration`,
    );
  }

  const declaration = invocationEntries[0];
  const isDirectPolicyChild =
    declaration.parent?.key === "policy" && declaration.parent.indent === 0;
  const exactFalsePolicy =
    /^  allow_implicit_invocation:\s*false\s*(?:#.*)?$/;

  if (
    !isDirectPolicyChild ||
    declaration.indent !== 2 ||
    declaration.quoted ||
    !exactFalsePolicy.test(declaration.line)
  ) {
    throw new Error(
      `${sourcePath}:${declaration.lineNumber}: policy.allow_implicit_invocation must be one unquoted direct child with boolean value false`,
    );
  }
}

function renderClaudeSkill(source, sourcePath) {
  const match = source.match(/^---(\r?\n)([\s\S]*?)(\r?\n)---(\r?\n|$)/);
  if (!match) {
    throw new Error(`${sourcePath}: missing or invalid YAML frontmatter`);
  }

  const frontmatter = match[2];
  if (/^disable-model-invocation\s*:/m.test(frontmatter)) {
    throw new Error(
      `${sourcePath}: canonical frontmatter must stay provider-neutral; remove disable-model-invocation`,
    );
  }

  const eol = match[1];
  const body = source.slice(match[0].length);
  return `---${eol}${frontmatter}${eol}disable-model-invocation: true${eol}---${match[4]}${body}`;
}

async function main() {
  const [harness, moduleId, targetArgument, ...extra] = process.argv.slice(2);

  if (
    extra.length > 0 ||
    !["codex", "claude"].includes(harness) ||
    !/^dwi-[a-z0-9-]+$/.test(moduleId ?? "") ||
    !targetArgument
  ) {
    fail(
      "usage: node scripts/install-module.mjs <codex|claude> <dwi-module-id> <target-directory>",
    );
    return;
  }

  const catalogPath = path.join(repositoryRoot, "modules", "catalog.json");
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  const knownModules = new Set(catalog.modules.map((entry) => entry.id));
  if (!knownModules.has(moduleId)) {
    fail(`unknown module ${moduleId}`);
    return;
  }

  const target = path.resolve(targetArgument);
  if (path.basename(target) !== moduleId) {
    fail(`target directory must end with ${moduleId}`);
    return;
  }

  const canonicalRepositoryRoot = await realpath(repositoryRoot);
  const canonicalTarget = await canonicalizeProspectivePath(target);
  if (isSameOrDescendant(canonicalRepositoryRoot, canonicalTarget)) {
    fail(
      `target directory must be outside the Dwi source checkout ${canonicalRepositoryRoot}`,
    );
    return;
  }

  if (await exists(target)) {
    fail(`refusing to overwrite existing path ${target}`);
    return;
  }

  const sourceDirectory = path.join(repositoryRoot, "modules", moduleId);
  const sourceSkillPath = path.join(sourceDirectory, "SKILL.md");
  const sourceSkill = await readFile(sourceSkillPath, "utf8");
  const targetParent = path.dirname(target);
  const staging = path.join(
    targetParent,
    `.${moduleId}.dwi-install-${process.pid}-${Date.now()}`,
  );

  await mkdir(targetParent, { recursive: true });
  await mkdir(staging);

  try {
    if (harness === "codex") {
      const sourceMetadataPath = path.join(
        sourceDirectory,
        "agents",
        "openai.yaml",
      );
      const sourceMetadata = await readFile(sourceMetadataPath, "utf8");
      validateCodexMetadata(sourceMetadata, sourceMetadataPath);

      await mkdir(path.join(staging, "agents"));
      await writeFile(path.join(staging, "SKILL.md"), sourceSkill, { mode: 0o644 });
      await writeFile(
        path.join(staging, "agents", "openai.yaml"),
        sourceMetadata,
        { mode: 0o644 },
      );
    } else {
      const rendered = renderClaudeSkill(sourceSkill, sourceSkillPath);
      await writeFile(path.join(staging, "SKILL.md"), rendered, { mode: 0o644 });
    }

    await rename(staging, target);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }

  console.log(
    `Installed ${moduleId} for ${harness} at ${target} with explicit-only invocation.`,
  );
}

function canonicalizeEntrypoint(filePath) {
  try {
    return realpathSync(filePath);
  } catch {
    return path.resolve(filePath);
  }
}

const isDirectRun =
  Boolean(process.argv[1]) &&
  canonicalizeEntrypoint(process.argv[1]) === canonicalizeEntrypoint(scriptPath);

if (isDirectRun) {
  main().catch((error) => {
    fail(error instanceof Error ? error.message : String(error));
  });
}
