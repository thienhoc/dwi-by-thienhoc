import { createHash } from "node:crypto";
import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const modules = ["conduct", "lean", "budget", "bridge", "arc", "evidence"];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function requirePath(relativePath) {
  if (!(await exists(relativePath))) {
    errors.push(`Missing required path: ${relativePath}`);
  }
}

async function walk(directory, results = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(absolutePath, results);
    } else {
      results.push(absolutePath);
    }
  }
  return results;
}

const requiredPaths = [
  "README.md",
  "README.vi.md",
  "MODULES.md",
  "MODULES.vi.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SECURITY.md",
  "SUPPORT.md",
  "GOVERNANCE.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  "checksums/SHA256SUMS",
  "LICENSE",
  "LICENSES.md",
  "LICENSES/CC-BY-4.0.txt",
  "NOTICE",
  "TRADEMARKS.md",
  "CITATION.cff",
  "docs/installation.md",
  "docs/vi/installation.md",
  "docs/glossary.md",
  "docs/vi/glossary.md",
  "docs/examples.md",
  "docs/vi/examples.md",
  "docs/safety.md",
  "docs/vi/safety.md",
  "docs/architecture.md",
  "docs/vi/architecture.md",
  "docs/evidence.md",
  "docs/vi/evidence.md",
  "docs/brand.md",
  "docs/license-decision.md",
  "docs/release-checklist.md",
  "docs/repository-metadata.md",
  "assets/ATTRIBUTION.md",
  "assets/brand/lockup.svg",
  "assets/architecture.svg",
  "assets/social-preview.svg",
  "assets/social-preview.png",
  ".github/workflows/validate.yml",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug.yml",
  ".github/ISSUE_TEMPLATE/module-proposal.yml",
  ".github/ISSUE_TEMPLATE/support.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  "scripts/public-release-preflight.mjs",
];

for (const requiredPath of requiredPaths) {
  await requirePath(requiredPath);
}

const forbiddenPaths = [
  ".openai/hosting.json",
  "app",
  "build",
  "worker",
  "public",
  "exports",
  "index.html",
  "next.config.ts",
  "vite.config.ts",
  "landing.css",
  "styles.css",
  "script.js",
  "theme.js",
  "module-page.js",
  "package-lock.json",
  ".gitignore 2",
  "README 2.md",
  "package 2.json",
];

for (const forbiddenPath of forbiddenPaths) {
  if (await exists(forbiddenPath)) {
    errors.push(`Website or deployment artifact remains: ${forbiddenPath}`);
  }
}

if (await exists("docs/public-release-strategy.md")) {
  errors.push(
    "Internal migration strategy remains in the community repository: docs/public-release-strategy.md",
  );
}

for (const moduleName of modules) {
  const skillPath = `modules/dwi-${moduleName}/SKILL.md`;
  const metadataPath = `modules/dwi-${moduleName}/agents/openai.yaml`;
  const englishGuide = `docs/modules/${moduleName}.md`;
  const vietnameseGuide = `docs/vi/modules/${moduleName}.md`;

  await requirePath(skillPath);
  await requirePath(metadataPath);
  await requirePath(englishGuide);
  await requirePath(vietnameseGuide);

  if (!(await exists(skillPath))) continue;

  const skill = await readFile(path.join(root, skillPath), "utf8");
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    errors.push(`${skillPath}: missing YAML frontmatter`);
    continue;
  }

  const frontmatterLines = frontmatter[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const keys = frontmatterLines.map((line) => line.split(":", 1)[0]);
  const expectedKeys = ["description", "name"];

  if (
    keys.length !== expectedKeys.length ||
    [...keys].sort().join(",") !== expectedKeys.join(",")
  ) {
    errors.push(`${skillPath}: frontmatter must contain only name and description`);
  }

  const declaredName = frontmatterLines
    .find((line) => line.startsWith("name:"))
    ?.slice("name:".length)
    .trim()
    .replace(/^["']|["']$/g, "");

  if (declaredName !== `dwi-${moduleName}`) {
    errors.push(`${skillPath}: name must be dwi-${moduleName}`);
  }

  if (skill.includes("TODO")) {
    errors.push(`${skillPath}: unresolved TODO`);
  }

  if (skill.split(/\r?\n/).length > 500) {
    errors.push(`${skillPath}: exceeds the 500-line review boundary`);
  }

  if (await exists(metadataPath)) {
    const metadata = await readFile(path.join(root, metadataPath), "utf8");
    if (!metadata.includes(`display_name: "Dwi • `)) {
      errors.push(`${metadataPath}: missing branded display name`);
    }
    if (!metadata.includes("allow_implicit_invocation: false")) {
      errors.push(`${metadataPath}: modules must be explicit-invocation by default`);
    }
  }
}

const checksumManifest = await readFile(
  path.join(root, "checksums/SHA256SUMS"),
  "utf8",
);
const checksumEntries = new Map();
for (const line of checksumManifest.split(/\r?\n/).filter(Boolean)) {
  const match = line.match(/^([a-f0-9]{64})  (modules\/dwi-[a-z]+\/SKILL\.md)$/);
  if (!match) {
    errors.push(`checksums/SHA256SUMS: malformed line ${line}`);
    continue;
  }
  checksumEntries.set(match[2], match[1]);
}

for (const moduleName of modules) {
  const skillPath = `modules/dwi-${moduleName}/SKILL.md`;
  const expectedHash = checksumEntries.get(skillPath);
  const actualHash = createHash("sha256")
    .update(await readFile(path.join(root, skillPath)))
    .digest("hex");
  if (!expectedHash) {
    errors.push(`checksums/SHA256SUMS: missing ${skillPath}`);
  } else if (actualHash !== expectedHash) {
    errors.push(`checksums/SHA256SUMS: stale hash for ${skillPath}`);
  }
}

if (checksumEntries.size !== modules.length) {
  errors.push("checksums/SHA256SUMS: must contain exactly six module entries");
}

const packageJson = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);

const canonicalDescription =
  "A modular human layer that helps reduce overplanning, token waste, context loss, and actions taken without clear permission.";

if (packageJson.description !== canonicalDescription) {
  errors.push("package.json: description must match the canonical repository description");
}

if (packageJson.private !== true) {
  errors.push("package.json: private must remain true; this is not a registry package");
}

if (packageJson.license !== "Apache-2.0") {
  errors.push("package.json: code license must be Apache-2.0");
}

const licenseMap = await readFile(path.join(root, "LICENSES.md"), "utf8");
for (const requiredTerm of ["Apache-2.0", "CC BY 4.0", "TRADEMARKS.md"]) {
  if (!licenseMap.includes(requiredTerm)) {
    errors.push(`LICENSES.md: missing license boundary ${requiredTerm}`);
  }
}

for (const dependencyField of [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
]) {
  if (
    packageJson[dependencyField] &&
    Object.keys(packageJson[dependencyField]).length > 0
  ) {
    errors.push(`package.json: ${dependencyField} must remain empty`);
  }
}

if (!(await exists("LICENSE"))) {
  const readme = await readFile(path.join(root, "README.md"), "utf8");
  if (!readme.includes("does not grant a reuse license yet")) {
    errors.push("README.md must disclose the absence of a reuse license");
  }
}

for (const descriptionPath of [
  "README.md",
  "CITATION.cff",
  "docs/brand.md",
  "docs/repository-metadata.md",
]) {
  const descriptionContent = await readFile(
    path.join(root, descriptionPath),
    "utf8",
  );
  if (!descriptionContent.includes(canonicalDescription)) {
    errors.push(
      `${descriptionPath}: missing canonical repository description`,
    );
  }
}

for (const installationPath of [
  "docs/installation.md",
  "docs/vi/installation.md",
]) {
  const installationContent = await readFile(
    path.join(root, installationPath),
    "utf8",
  );
  if (
    installationContent.includes(
      "raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/main/",
    )
  ) {
    errors.push(`${installationPath}: remote install must not use mutable main`);
  }
  if (installationContent.includes("rm -rf")) {
    errors.push(`${installationPath}: removal must not use recursive deletion`);
  }
}

const architectureAsset = await readFile(
  path.join(root, "assets/architecture.svg"),
  "utf8",
);
if (
  !architectureAsset.includes('fill="#FF4F2E">{ }</text>') ||
  !architectureAsset.includes('fill="#A8ADB5"')
) {
  errors.push(
    "assets/architecture.svg: lockup must use signal braces and a light-gray dot",
  );
}

const socialPreview = await readFile(
  path.join(root, "assets/social-preview.png"),
);
const pngSignature = "89504e470d0a1a0a";
if (
  socialPreview.length < 24 ||
  socialPreview.subarray(0, 8).toString("hex") !== pngSignature ||
  socialPreview.readUInt32BE(16) !== 1280 ||
  socialPreview.readUInt32BE(20) !== 640
) {
  errors.push("assets/social-preview.png: must be a 1280x640 PNG");
}

const files = await walk(root);
const legacyAuthorEmail = ["thienhoc.tk", "gmail.com"].join("@");
const publicTextExtensions = new Set([
  ".cff",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".txt",
  ".yaml",
  ".yml",
]);
for (const file of files) {
  if (!publicTextExtensions.has(path.extname(file))) continue;
  const content = await readFile(file, "utf8");
  if (content.includes(legacyAuthorEmail)) {
    errors.push(
      `${path.relative(root, file)}: contains a legacy private author identity`,
    );
  }
}
const markdownFiles = files.filter((file) => file.endsWith(".md"));
const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;

for (const markdownFile of markdownFiles) {
  const content = await readFile(markdownFile, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("mailto:") ||
      target.startsWith("#")
    ) {
      continue;
    }

    target = target.split(/\s+["']/)[0].split("#")[0];
    if (!target) continue;

    let decodedTarget;
    try {
      decodedTarget = decodeURIComponent(target);
    } catch {
      errors.push(
        `${path.relative(root, markdownFile)}: invalid link encoding ${target}`,
      );
      continue;
    }

    const resolved = decodedTarget.startsWith("/")
      ? path.join(root, decodedTarget.slice(1))
      : path.resolve(path.dirname(markdownFile), decodedTarget);

    if (!resolved.startsWith(root)) {
      errors.push(
        `${path.relative(root, markdownFile)}: link escapes repository ${target}`,
      );
      continue;
    }

    try {
      await stat(resolved);
    } catch {
      errors.push(
        `${path.relative(root, markdownFile)}: broken internal link ${target}`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(`Repository contract failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Repository contract passed: ${modules.length} independent modules, EN/VI guides, no website runtime, no package dependencies.`,
  );
}
