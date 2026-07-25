import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const results = [];
const catalog = JSON.parse(
  readFileSync(path.join(root, "modules/catalog.json"), "utf8"),
);
const moduleCount = catalog.modules.length;
const focusedModuleCount = catalog.modules.filter(
  (entry) => entry.kind === "focused",
).length;
const compositeModuleCount = catalog.modules.filter(
  (entry) => entry.kind === "composite",
).length;

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function git(args) {
  return run("git", args);
}

function pass(name, detail) {
  results.push({ status: "PASS", name, detail });
}

function fail(name, detail) {
  results.push({ status: "FAIL", name, detail });
}

function manual(name, detail) {
  results.push({ status: "MANUAL", name, detail });
}

function recordCommand(name, result, successDetail) {
  if (result.status === 0) {
    pass(name, successDetail);
  } else {
    const detail = (result.stderr || result.stdout || "command failed").trim();
    fail(name, detail);
  }
}

function lines(value) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

const validator = run(process.execPath, ["scripts/validate-repo.mjs"]);
recordCommand(
  "Repository contract",
  validator,
  `${moduleCount} modules (${focusedModuleCount} focused, ${compositeModuleCount} composite), EN/VI documentation, links, release truth, and no website runtime passed.`,
);

recordCommand(
  "Whitespace contract",
  git(["diff", "--check"]),
  "Git reports no whitespace errors.",
);

const status = git(["status", "--porcelain"]);
if (status.status !== 0) {
  fail("Clean working tree", (status.stderr || "git status failed").trim());
} else if (status.stdout.trim()) {
  fail("Clean working tree", "Uncommitted or untracked changes remain.");
} else {
  pass("Clean working tree", "No uncommitted or untracked changes.");
}

const expectedRemote = "https://github.com/thienhoc/dwi-by-thienhoc.git";
const remote = git(["remote", "get-url", "origin"]);
const normalizedRemote = remote.stdout.trim().replace(/\.git$/, "");
const normalizedExpectedRemote = expectedRemote.replace(/\.git$/, "");
if (remote.status === 0 && normalizedRemote === normalizedExpectedRemote) {
  pass("Canonical remote", expectedRemote);
} else {
  fail(
    "Canonical remote",
    remote.status === 0 ? remote.stdout.trim() : "origin is unavailable",
  );
}

const branch = git(["branch", "--show-current"]);
if (branch.status === 0 && branch.stdout.trim() === "main") {
  pass("Default publication branch", "main");
} else {
  fail(
    "Default publication branch",
    branch.status === 0 ? branch.stdout.trim() : "branch is unavailable",
  );
}

const forbiddenPathRules = [
  (file) => file === ".openai/hosting.json",
  (file) => file === "index.html",
  (file) => file === "landing.css",
  (file) => file === "module-page.js",
  (file) => file.startsWith("app/"),
  (file) => file.startsWith("build/"),
  (file) => file.startsWith("worker/"),
  (file) => file.startsWith("public/"),
  (file) => file.startsWith("exports/"),
];

function forbiddenPathsAt(commit) {
  const tree = git(["ls-tree", "-r", "--name-only", commit]);
  if (tree.status !== 0) return [`Unable to read ${commit}`];
  return lines(tree.stdout).filter((file) =>
    forbiddenPathRules.some((rule) => rule(file)),
  );
}

const headForbidden = forbiddenPathsAt("HEAD");
if (headForbidden.length === 0) {
  pass("HEAD product boundary", "No website, hosting, telemetry, or export paths.");
} else {
  fail(
    "HEAD product boundary",
    `${headForbidden.length} forbidden path(s), including ${headForbidden
      .slice(0, 3)
      .join(", ")}`,
  );
}

const commitsResult = git(["rev-list", "--all"]);
const commits = commitsResult.status === 0 ? lines(commitsResult.stdout) : [];
const historyFindings = [];
for (const commit of commits) {
  const forbidden = forbiddenPathsAt(commit);
  if (forbidden.length > 0) {
    historyFindings.push(`${commit.slice(0, 12)}:${forbidden[0]}`);
  }
}

if (commits.length === 0) {
  fail("Reachable history boundary", "No reachable commit could be inspected.");
} else if (historyFindings.length === 0) {
  pass(
    "Reachable history boundary",
    `${commits.length} reachable commit(s) contain no forbidden website path.`,
  );
} else {
  fail(
    "Reachable history boundary",
    `${historyFindings.length} commit(s) retain website material; first: ${historyFindings[0]}`,
  );
}

const emails = git(["log", "--all", "--format=%ae"]);
const uniqueEmails = emails.status === 0 ? [...new Set(lines(emails.stdout))] : [];
const legacyAuthorEmail = ["thienhoc.tk", "gmail.com"].join("@");
if (uniqueEmails.includes(legacyAuthorEmail)) {
  fail(
    "Public author identity",
    "Reachable history contains a legacy private author identity; use clean history or obtain explicit disclosure approval.",
  );
} else if (uniqueEmails.length > 0) {
  pass("Public author identity", uniqueEmails.join(", "));
} else {
  fail("Public author identity", "No reachable author identity found.");
}

const codeLicense = ["LICENSE", "LICENSE.md", "LICENSE.txt"].find((file) =>
  existsSync(path.join(root, file)),
);
if (codeLicense) {
  pass("Code license", codeLicense);
} else {
  fail("Code license", "No root LICENSE file exists.");
}

if (existsSync(path.join(root, "LICENSES.md"))) {
  const licenseMap = readFileSync(path.join(root, "LICENSES.md"), "utf8");
  const requiredTerms = ["Apache-2.0", "CC BY 4.0", "TRADEMARKS.md"];
  const missingTerms = requiredTerms.filter((term) => !licenseMap.includes(term));
  if (missingTerms.length === 0) {
    pass("License mapping", "LICENSES.md maps code, documentation, assets, and brand.");
  } else {
    fail("License mapping", `LICENSES.md is missing: ${missingTerms.join(", ")}`);
  }
} else {
  fail(
    "License mapping",
    "LICENSES.md is required to map code, documentation, assets, and brand terms.",
  );
}

const readme = readFileSync(path.join(root, "README.md"), "utf8");
if (readme.includes("does not grant a reuse license yet")) {
  fail(
    "Public README license state",
    "README still states that no reuse license is granted.",
  );
} else {
  pass("Public README license state", "No pending-license warning remains.");
}

const installDocs = [
  readFileSync(path.join(root, "docs/installation.md"), "utf8"),
  readFileSync(path.join(root, "docs/vi/installation.md"), "utf8"),
].join("\n");
if (installDocs.includes("<tag-or-commit>")) {
  fail(
    "Immutable install reference",
    "Installation docs still contain the <tag-or-commit> placeholder.",
  );
} else {
  pass("Immutable install reference", "Installation docs name a release reference.");
}

const tags = git(["tag", "--points-at", "HEAD"]);
if (tags.status === 0 && lines(tags.stdout).length > 0) {
  pass("Reviewed release tag", lines(tags.stdout).join(", "));
} else {
  fail("Reviewed release tag", "No tag points at HEAD.");
}

const attribution = readFileSync(
  path.join(root, "assets/ATTRIBUTION.md"),
  "utf8",
);
const visualApprovalRecorded = attribution
  .split(/\r?\n/)
  .some((line) => line.trim() === "Release approval: APPROVED by Wi.");
if (visualApprovalRecorded) {
  pass("Visual and typography approval", "Recorded in assets/ATTRIBUTION.md.");
} else {
  fail(
    "Visual and typography approval",
    "Asset release approval remains pending.",
  );
}

const checklist = readFileSync(
  path.join(root, "docs/release-checklist.md"),
  "utf8",
);
const blockingSection =
  checklist.split("## Blocking gates")[1]?.split("## Repository settings")[0] ??
  "";
if (blockingSection.includes("- [ ]")) {
  fail("Blocking checklist", "One or more blocking release gates remain open.");
} else {
  pass("Blocking checklist", "All blocking release gates are checked.");
}

manual(
  "GitHub visibility and access",
  "Confirm the repository is public only after explicit Wi approval.",
);
manual(
  "GitHub discovery settings",
  "Confirm About, website, topics, social preview, branch protection, and required checks.",
);
manual(
  "GitHub security settings",
  "Confirm secret scanning and push protection when available.",
);
manual(
  "Rendered asset review",
  "Inspect the exported social preview, lockup, and architecture asset.",
);
manual(
  "Clean harness trials",
  "Run Codex and Claude Code install, invocation, and removal from clean environments.",
);

console.log("Dwi public-release preflight\n");
for (const result of results) {
  console.log(`${result.status.padEnd(6)} ${result.name}: ${result.detail}`);
}

const failures = results.filter((result) => result.status === "FAIL");
const manualChecks = results.filter((result) => result.status === "MANUAL");
console.log(
  `\nSummary: ${failures.length} blocker(s), ${manualChecks.length} manual check(s).`,
);

if (failures.length > 0) {
  process.exitCode = 1;
}
