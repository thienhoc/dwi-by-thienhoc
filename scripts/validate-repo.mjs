import { createHash } from "node:crypto";
import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

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

async function readText(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function readJson(relativePath) {
  try {
    return JSON.parse(await readText(relativePath));
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON: ${error.message}`);
    return null;
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

function reportAndExit() {
  if (errors.length > 0) {
    console.error(`Repository contract failed with ${errors.length} issue(s):`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return true;
  }
  return false;
}

function countMarkdownCells(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return null;
  return trimmed.slice(1, -1).split("|").length;
}

function requireContains(content, expected, source) {
  if (!content.includes(expected)) {
    errors.push(`${source}: missing required content ${JSON.stringify(expected)}`);
  }
}

function requireNotContains(content, forbidden, source) {
  if (content.includes(forbidden)) {
    errors.push(`${source}: contains stale or forbidden content ${JSON.stringify(forbidden)}`);
  }
}

const catalogPath = "modules/catalog.json";
await requirePath(catalogPath);
if (reportAndExit()) process.exit();

const catalog = await readJson(catalogPath);
if (!catalog) {
  reportAndExit();
  process.exit();
}

if (catalog.schema_version !== 1) {
  errors.push("modules/catalog.json: schema_version must be 1");
}

if (catalog.repository_version !== "0.2.0-dev") {
  errors.push("modules/catalog.json: repository_version must be 0.2.0-dev");
}

if (catalog.latest_reviewed_release !== "v0.1.0") {
  errors.push("modules/catalog.json: latest_reviewed_release must be v0.1.0");
}

if (!Array.isArray(catalog.modules)) {
  errors.push("modules/catalog.json: modules must be an array");
}

const moduleEntries = Array.isArray(catalog.modules) ? catalog.modules : [];
const focusedModules = moduleEntries.filter((entry) => entry.kind === "focused");
const compositeModules = moduleEntries.filter((entry) => entry.kind === "composite");

if (focusedModules.length !== 6) {
  errors.push("modules/catalog.json: exactly six focused modules are required");
}

if (compositeModules.length !== 1) {
  errors.push("modules/catalog.json: exactly one composite module is required");
}

const seenSlugs = new Set();
const seenIds = new Set();

for (const entry of moduleEntries) {
  if (!entry || typeof entry !== "object") {
    errors.push("modules/catalog.json: every module entry must be an object");
    continue;
  }

  const requiredFields = [
    "slug",
    "id",
    "title",
    "kind",
    "released_in",
    "remote_install",
  ];

  for (const field of requiredFields) {
    if (!(field in entry)) {
      errors.push(`modules/catalog.json: ${entry.id ?? "unknown"} missing ${field}`);
    }
  }

  if (seenSlugs.has(entry.slug)) {
    errors.push(`modules/catalog.json: duplicate slug ${entry.slug}`);
  }
  seenSlugs.add(entry.slug);

  if (seenIds.has(entry.id)) {
    errors.push(`modules/catalog.json: duplicate id ${entry.id}`);
  }
  seenIds.add(entry.id);

  if (entry.id !== `dwi-${entry.slug}`) {
    errors.push(`modules/catalog.json: id must be dwi-${entry.slug}`);
  }

  if (!["focused", "composite"].includes(entry.kind)) {
    errors.push(`modules/catalog.json: invalid kind for ${entry.id}`);
  }

  if (entry.kind === "focused") {
    if (entry.released_in !== "v0.1.0" || entry.remote_install !== true) {
      errors.push(
        `modules/catalog.json: focused module ${entry.id} must be released in v0.1.0 with remote_install true`,
      );
    }
  }

  if (entry.kind === "composite") {
    if (entry.released_in !== null || entry.remote_install !== false) {
      errors.push(
        `modules/catalog.json: composite module ${entry.id} must remain unreleased with remote_install false`,
      );
    }
  }
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
  "docs/releases/v0.1.0.md",
  "docs/repository-metadata.md",
  "evidence/compatibility/README.md",
  "evidence/compatibility/2026-07-25-codex-project-scope.md",
  "evidence/compatibility/2026-07-25-claude-code-bounded-trial.md",
  "evals/README.md",
  "evals/conduct/one-blocking-question.md",
  "evals/lean/direct-small-task.md",
  "evals/budget/no-invented-telemetry.md",
  "evals/bridge/message-not-authority.md",
  "evals/arc/no-agent-fleet-for-small-task.md",
  "evals/evidence/no-static-to-runtime-upgrade.md",
  "evals/all-in-one/silent-fast-path.md",
  "evals/all-in-one/authority-blocker.md",
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
  "modules/catalog.json",
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

for (const entry of moduleEntries) {
  const skillPath = `modules/${entry.id}/SKILL.md`;
  const metadataPath = `modules/${entry.id}/agents/openai.yaml`;
  const englishGuide = `docs/modules/${entry.slug}.md`;
  const vietnameseGuide = `docs/vi/modules/${entry.slug}.md`;

  await requirePath(skillPath);
  await requirePath(metadataPath);
  await requirePath(englishGuide);
  await requirePath(vietnameseGuide);

  if (!(await exists(skillPath))) continue;

  const skill = await readText(skillPath);
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
    .replace(/^['"]|['"]$/g, "");

  if (declaredName !== entry.id) {
    errors.push(`${skillPath}: name must be ${entry.id}`);
  }

  if (skill.includes("TODO")) {
    errors.push(`${skillPath}: unresolved TODO`);
  }

  if (skill.split(/\r?\n/).length > 500) {
    errors.push(`${skillPath}: exceeds the 500-line review boundary`);
  }

  if (await exists(metadataPath)) {
    const metadata = await readText(metadataPath);
    requireContains(metadata, `display_name: "Dwi • ${entry.title}"`, metadataPath);
    requireContains(metadata, "allow_implicit_invocation: false", metadataPath);
  }
}

const readmeEn = await readText("README.md");
const readmeVi = await readText("README.vi.md");
const modulesEn = await readText("MODULES.md");
const modulesVi = await readText("MODULES.vi.md");
const examplesEn = await readText("docs/examples.md");
const examplesVi = await readText("docs/vi/examples.md");
const installationEn = await readText("docs/installation.md");
const installationVi = await readText("docs/vi/installation.md");
const codexEvidence = await readText(
  "evidence/compatibility/2026-07-25-codex-project-scope.md",
);
const claudeEvidence = await readText(
  "evidence/compatibility/2026-07-25-claude-code-bounded-trial.md",
);

for (const [source, content, requiredHeadings] of [
  [
    "MODULES.md",
    modulesEn,
    ["## Independence contract", "## Installation scope", "## Version references"],
  ],
  [
    "MODULES.vi.md",
    modulesVi,
    ["## Hợp đồng độc lập", "## Phạm vi cài", "## Tham chiếu phiên bản"],
  ],
]) {
  for (const heading of requiredHeadings) {
    requireContains(content, heading, source);
  }
  requireContains(content, ".agents/skills/<module>/SKILL.md", source);
  requireContains(content, ".claude/skills/<module>/SKILL.md", source);
}

const historicalSourceCommit =
  "694246fff0217c20a212d0342b55a0b9bfc4a6d2";

requireContains(
  codexEvidence,
  `Historical source commit: \`${historicalSourceCommit}\``,
  "evidence/compatibility/2026-07-25-codex-project-scope.md",
);
requireContains(
  codexEvidence,
  "Scope: Project-scope installation, activation, and removal",
  "evidence/compatibility/2026-07-25-codex-project-scope.md",
);
requireContains(
  codexEvidence,
  "Exact commands, session sequence, tested module, task, and environment: `UNKNOWN`",
  "evidence/compatibility/2026-07-25-codex-project-scope.md",
);
requireNotContains(
  codexEvidence,
  "1. Install a Dwi module",
  "evidence/compatibility/2026-07-25-codex-project-scope.md",
);

requireContains(
  claudeEvidence,
  `Historical source commit: \`${historicalSourceCommit}\``,
  "evidence/compatibility/2026-07-25-claude-code-bounded-trial.md",
);
requireContains(
  claudeEvidence,
  "Scope: `UNKNOWN`",
  "evidence/compatibility/2026-07-25-claude-code-bounded-trial.md",
);
requireContains(
  claudeEvidence,
  "Method: `UNKNOWN`",
  "evidence/compatibility/2026-07-25-claude-code-bounded-trial.md",
);
for (const unsupportedClaim of [
  "project-scoped Dwi trial",
  "Project-scoped Dwi trial",
  "1. Install a Dwi module",
]) {
  requireNotContains(
    claudeEvidence,
    unsupportedClaim,
    "evidence/compatibility/2026-07-25-claude-code-bounded-trial.md",
  );
}

for (const entry of moduleEntries) {
  requireContains(
    readmeEn,
    `(docs/modules/${entry.slug}.md)`,
    "README.md",
  );
  requireContains(
    readmeVi,
    `(docs/vi/modules/${entry.slug}.md)`,
    "README.vi.md",
  );
  requireContains(modulesEn, `\`${entry.id}\``, "MODULES.md");
  requireContains(modulesVi, `\`${entry.id}\``, "MODULES.vi.md");
  requireContains(examplesEn, `## ${entry.title}`, "docs/examples.md");
  requireContains(examplesVi, `## ${entry.title}`, "docs/vi/examples.md");
}

for (const [source, content, expectedCells] of [
  ["MODULES.md", modulesEn, 5],
  ["MODULES.vi.md", modulesVi, 4],
]) {
  const lines = content.split(/\r?\n/);
  for (const entry of moduleEntries) {
    const row = lines.find((line) => line.includes(`\`${entry.id}\``));
    if (!row) continue;
    const cells = countMarkdownCells(row);
    if (cells !== expectedCells) {
      errors.push(
        `${source}: module row for ${entry.id} must contain ${expectedCells} table cells, found ${cells}`,
      );
    }
  }
}

for (const [source, content] of [
  ["README.md", readmeEn],
  ["README.vi.md", readmeVi],
]) {
  const lines = content.split(/\r?\n/);
  for (const entry of moduleEntries) {
    const guidePath =
      source === "README.md"
        ? `docs/modules/${entry.slug}.md`
        : `docs/vi/modules/${entry.slug}.md`;
    const row = lines.find((line) => line.includes(`(${guidePath})`));
    if (!row) continue;
    const cells = countMarkdownCells(row);
    if (cells !== 3) {
      errors.push(
        `${source}: module row for ${entry.id} must contain 3 table cells, found ${cells}`,
      );
    }
  }
}

for (const issueTemplate of [
  ".github/ISSUE_TEMPLATE/bug.yml",
  ".github/ISSUE_TEMPLATE/module-proposal.yml",
  ".github/ISSUE_TEMPLATE/support.yml",
]) {
  const content = await readText(issueTemplate);
  for (const entry of moduleEntries) {
    requireContains(content, `        - ${entry.title}`, issueTemplate);
  }
}

const checksumManifest = await readText("checksums/SHA256SUMS");
const checksumEntries = new Map();

for (const line of checksumManifest.split(/\r?\n/).filter(Boolean)) {
  const match = line.match(
    /^([a-f0-9]{64})  (modules\/dwi-[a-z-]+\/SKILL\.md)$/,
  );
  if (!match) {
    errors.push(`checksums/SHA256SUMS: malformed line ${line}`);
    continue;
  }
  checksumEntries.set(match[2], match[1]);
}

for (const entry of moduleEntries) {
  const skillPath = `modules/${entry.id}/SKILL.md`;
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

if (checksumEntries.size !== moduleEntries.length) {
  errors.push("checksums/SHA256SUMS: entry count must match modules/catalog.json");
}

const packageJson = await readJson("package.json");
if (packageJson) {
  const canonicalDescription =
    "A modular human layer that helps reduce overplanning, token waste, context loss, and actions taken without clear permission.";

  if (packageJson.version !== catalog.repository_version) {
    errors.push("package.json: version must match modules/catalog.json");
  }

  if (packageJson.description !== canonicalDescription) {
    errors.push("package.json: description must match the canonical repository description");
  }

  if (packageJson.private !== true) {
    errors.push("package.json: private must remain true; this is not a registry package");
  }

  if (packageJson.license !== "Apache-2.0") {
    errors.push("package.json: license must be Apache-2.0");
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

  for (const descriptionPath of [
    "README.md",
    "CITATION.cff",
    "docs/brand.md",
    "docs/repository-metadata.md",
  ]) {
    const descriptionContent = await readText(descriptionPath);
    requireContains(descriptionContent, canonicalDescription, descriptionPath);
  }
}

const citation = await readText("CITATION.cff");
requireContains(
  citation,
  `version: "${catalog.repository_version}"`,
  "CITATION.cff",
);

const licenseMap = await readText("LICENSES.md");
for (const requiredTerm of [
  "Apache-2.0",
  "CC BY 4.0",
  "TRADEMARKS.md",
  "`evals/**`",
  "`evidence/**`",
]) {
  requireContains(licenseMap, requiredTerm, "LICENSES.md");
}

for (const installationPath of [
  "docs/installation.md",
  "docs/vi/installation.md",
]) {
  const installationContent = await readText(installationPath);

  requireNotContains(
    installationContent,
    "raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/main/",
    installationPath,
  );

  requireNotContains(installationContent, "rm -rf", installationPath);
  requireNotContains(installationContent, "reviewed checkout", installationPath);
  requireNotContains(installationContent, "checkout đã duyệt", installationPath);
}

const focusedInstallEn =
  installationEn
    .split("## Install a different focused module")[1]
    ?.split("## All-in-One development trial")[0] ?? "";
const focusedInstallVi =
  installationVi
    .split("## Cài một mô-đun chuyên biệt khác")[1]
    ?.split("## Thử All-in-One trong môi trường phát triển")[0] ?? "";

if (!focusedInstallEn.trim()) {
  errors.push("docs/installation.md: focused-module install section is missing");
} else {
  requireNotContains(
    focusedInstallEn,
    "dwi-all-in-one",
    "docs/installation.md focused-module section",
  );
}

if (!focusedInstallVi.trim()) {
  errors.push("docs/vi/installation.md: focused-module install section is missing");
} else {
  requireNotContains(
    focusedInstallVi,
    "dwi-all-in-one",
    "docs/vi/installation.md focused-module section",
  );
}

requireContains(
  installationEn,
  "## All-in-One development trial (not in v0.1.0)",
  "docs/installation.md",
);
requireContains(
  installationVi,
  "## Thử All-in-One trong môi trường phát triển (không có trong v0.1.0)",
  "docs/vi/installation.md",
);

const architectureAsset = await readText("assets/architecture.svg");
if (
  !architectureAsset.includes('fill="#FF4F2E">{ }</text>') ||
  !architectureAsset.includes('fill="#A8ADB5"')
) {
  errors.push(
    "assets/architecture.svg: lockup must use signal braces and a light-gray dot",
  );
}

const socialPreview = await readFile(path.join(root, "assets/social-preview.png"));
const pngSignature = "89504e470d0a1a0a";

if (
  socialPreview.length < 24 ||
  socialPreview.subarray(0, 8).toString("hex") !== pngSignature ||
  socialPreview.readUInt32BE(16) !== 1280 ||
  socialPreview.readUInt32BE(20) !== 640
) {
  errors.push("assets/social-preview.png: must be a 1280x640 PNG");
}

const currentOperationalSurfaces = [
  "README.md",
  "README.vi.md",
  "MODULES.md",
  "MODULES.vi.md",
  "CHANGELOG.md",
  "ROADMAP.md",
  "CONTRIBUTING.md",
  "docs/release-checklist.md",
];

const stalePhrases = [
  "repository is in private Research Preview",
  "While the repository is private",
  "No public release tag has been created",
  "Public release is blocked",
  "Tested with Claude and Codex",
  "Khi kho còn private",
  "Đã test với Claude và Codex",
];

for (const surface of currentOperationalSurfaces) {
  const content = await readText(surface);
  for (const phrase of stalePhrases) {
    requireNotContains(content, phrase, surface);
  }
}

requireContains(readmeEn, "0.2.0-dev", "README.md");
requireContains(readmeEn, "v0.1.0", "README.md");
requireContains(readmeVi, "0.2.0-dev", "README.vi.md");
requireContains(readmeVi, "v0.1.0", "README.vi.md");

const changelog = await readText("CHANGELOG.md");
requireContains(changelog, "## 0.1.0 - 2026-07-25", "CHANGELOG.md");

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

    const relative = path.relative(root, resolved);
    const escapesRoot =
      relative === ".." ||
      relative.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relative);

    if (escapesRoot) {
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
    `Repository contract passed: ${moduleEntries.length} modules (${focusedModules.length} focused, ${compositeModules.length} composite), EN/VI semantic surfaces, release truth, no website runtime, and no package dependencies.`,
  );
}
