#!/usr/bin/env node

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
      if (!sourceMetadata.includes("allow_implicit_invocation: false")) {
        throw new Error(
          `${sourceMetadataPath}: missing allow_implicit_invocation: false`,
        );
      }

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

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
