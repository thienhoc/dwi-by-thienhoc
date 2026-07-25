# Install one module, inspect first

Dwi is a modular human layer. Each module is distributed as agent-native instructions. There is no Dwi daemon, background service, MCP server, or website dependency. A supported AI coding tool such as Codex or Claude Code is still required.

## Important activation-policy correction

The installation examples published in `v0.1.0` through `v0.2.1` copied only `SKILL.md`. That was enough for the harness to discover the module, but it did not preserve Dwi's intended explicit-only invocation contract:

- Codex also needs `agents/openai.yaml` with `allow_implicit_invocation: false`.
- Claude Code needs `disable-model-invocation: true` in the installed `SKILL.md` frontmatter.

Without those harness-specific controls, the model may select a Dwi module from its description even when the person did not invoke it explicitly. This is a packaging and documentation defect. It does not grant the module extra tool permissions or bypass the native sandbox and approval system.

The earlier examples also changed into the Dwi checkout before using a relative target such as `.agents/skills/...`. Unless the Dwi checkout was intentionally the project under test, that installed the module into the source checkout rather than the person's actual project. The corrected examples keep `DWI_ROOT` and `PROJECT_ROOT` separate, resolve physical paths before comparing them, and reject a target inside the Dwi source checkout.

Published release tags remain immutable. Do not rewrite them. Until a corrected patch release is tagged, use an exact inspected commit containing `scripts/install-module.mjs`; an exact development commit identifies source under inspection but is not itself a release.

## Before installing

1. Choose one module from [MODULES.md](../MODULES.md).
2. Read its canonical `SKILL.md` in the repository.
3. Confirm its effects, non-goals, permission boundaries, invocation policy, and removal path.
4. Use project scope for the first trial.
5. Choose a reversible task with no secrets and no external side effects.

Do not pipe an unreviewed remote script into a shell.

## Install from a pinned checkout

Keep the inspected Dwi source checkout separate from the project receiving the module. Replace both example paths below with directories that already exist. `pwd -P` resolves alternate spellings and symlink aliases before the containment check:

```bash
DWI_ROOT="$(cd "/absolute/path/to/dwi-by-thienhoc" && pwd -P)" || exit 1
PROJECT_ROOT="$(cd "/absolute/path/to/your-project" && pwd -P)" || exit 1
test -f "$DWI_ROOT/scripts/install-module.mjs"
case "$PROJECT_ROOT/" in
  "$DWI_ROOT/"*)
    printf '%s\n' "PROJECT_ROOT must resolve outside DWI_ROOT" >&2
    exit 1
    ;;
esac
node --version
```

The local helper requires Node.js 20 or later, refuses to overwrite an existing module directory, stages the complete artifact before moving it into place, canonicalizes the prospective target, and rejects targets that resolve to the Dwi source checkout or any directory inside it. This last check also covers symlink aliases.

## Codex

Codex discovers repository skills under `.agents/skills/` and user skills under `~/.agents/skills/`.

Project-scoped example for Conduct:

```bash
MODULE="dwi-conduct"
TARGET="${PROJECT_ROOT}/.agents/skills/${MODULE}"
node "$DWI_ROOT/scripts/install-module.mjs" codex "$MODULE" "$TARGET"
test -f "$TARGET/SKILL.md"
test -f "$TARGET/agents/openai.yaml"
grep -Eq '^  allow_implicit_invocation: false$' "$TARGET/agents/openai.yaml"
```

The installed structure is:

```text
<your-project>/.agents/skills/dwi-conduct/
├── SKILL.md
└── agents/
    └── openai.yaml
```

Then start a fresh Codex session from `PROJECT_ROOT` and invoke `$dwi-conduct` explicitly. A matching prompt that does not mention `$dwi-conduct` should not activate the module implicitly.

### Recognize the affected one-file pattern

Do not run the following affected pattern. It is shown verbatim only so that an existing `v0.1.0` through `v0.2.1` installation can be identified:

```text
SOURCE="modules/dwi-conduct/SKILL.md"
TARGET=".agents/skills/dwi-conduct"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

If those were the only steps used, check whether the module was installed into the Dwi checkout or the intended project, then add the missing Codex metadata with the repair procedure below.

### Manual Codex equivalent

```bash
MODULE="dwi-conduct"
SOURCE="${DWI_ROOT}/modules/${MODULE}"
TARGET="${PROJECT_ROOT}/.agents/skills/${MODULE}"
test -f "$SOURCE/SKILL.md"
test -f "$SOURCE/agents/openai.yaml"
test ! -e "$TARGET"
install -d "$TARGET/agents"
install -m 0644 "$SOURCE/SKILL.md" "$TARGET/SKILL.md"
install -m 0644 "$SOURCE/agents/openai.yaml" "$TARGET/agents/openai.yaml"
cmp "$SOURCE/SKILL.md" "$TARGET/SKILL.md"
cmp "$SOURCE/agents/openai.yaml" "$TARGET/agents/openai.yaml"
```

## Claude Code

Claude Code discovers project skills under `.claude/skills/` and user skills under `~/.claude/skills/`.

Project-scoped example for Conduct:

```bash
MODULE="dwi-conduct"
TARGET="${PROJECT_ROOT}/.claude/skills/${MODULE}"
node "$DWI_ROOT/scripts/install-module.mjs" claude "$MODULE" "$TARGET"
test -f "$TARGET/SKILL.md"
grep -Eq '^disable-model-invocation: true$' "$TARGET/SKILL.md"
```

The helper derives the Claude artifact from the canonical provider-neutral `SKILL.md` and adds exactly one harness-specific frontmatter field:

```yaml
disable-model-invocation: true
```

Then start a fresh Claude Code session from `PROJECT_ROOT` and invoke `/dwi-conduct` explicitly. A matching prompt that does not invoke `/dwi-conduct` should not make Claude load the module automatically.

### Recognize the affected one-file pattern

Do not run the following affected pattern. It is shown verbatim only so that an existing `v0.1.0` through `v0.2.1` installation can be identified:

```text
SOURCE="modules/dwi-conduct/SKILL.md"
TARGET=".claude/skills/dwi-conduct"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

If Node.js is unavailable, copy the canonical `SKILL.md` from `DWI_ROOT`, add `disable-model-invocation: true` inside its opening YAML frontmatter, and verify that the rest of the file is unchanged before starting a fresh session from `PROJECT_ROOT`.

## Install a different module

Replace `dwi-conduct` with one of:

```text
dwi-lean
dwi-budget
dwi-bridge
dwi-arc
dwi-evidence
dwi-all-in-one
```

`dwi-all-in-one` is an optional composition module. Install it only when multiple observed problems recur in the same workflow.

## Public release: pinned module URLs

The immutable raw source URLs below remain useful for inspection, but the `v0.2.0` one-file path is not a complete explicit-only installation package. Do not copy only `SKILL.md` when activation timing matters.

| Module | Immutable canonical source |
| --- | --- |
| Conduct | [dwi-conduct/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-conduct/SKILL.md) |
| Lean | [dwi-lean/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-lean/SKILL.md) |
| Budget | [dwi-budget/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-budget/SKILL.md) |
| Bridge | [dwi-bridge/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-bridge/SKILL.md) |
| Arc | [dwi-arc/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-arc/SKILL.md) |
| Evidence | [dwi-evidence/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-evidence/SKILL.md) |
| All-in-One | [dwi-all-in-one/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.2.0/modules/dwi-all-in-one/SKILL.md) |

The next corrected release must pin the complete per-harness installation path and pass `scripts/validate-install-contract.mjs` before publication.

## Repair an existing one-file install

First identify the project that actually contains the installed `SKILL.md`. Use that directory as `PROJECT_ROOT`; do not assume the Dwi checkout is the destination. Resolve both roots with the physical-path block above before repairing anything.

### Codex repair

If the installed module currently contains only `SKILL.md`, add the missing metadata without replacing the skill:

```bash
MODULE="dwi-conduct"
SOURCE="${DWI_ROOT}/modules/${MODULE}/agents/openai.yaml"
TARGET="${PROJECT_ROOT}/.agents/skills/${MODULE}/agents/openai.yaml"
test -f "${PROJECT_ROOT}/.agents/skills/${MODULE}/SKILL.md"
test -f "$SOURCE"
test ! -e "$TARGET"
install -d "$(dirname "$TARGET")"
install -m 0644 "$SOURCE" "$TARGET"
cmp "$SOURCE" "$TARGET"
```

Start a fresh Codex session from `PROJECT_ROOT` afterward.

### Claude Code repair

The quickest reversible control is to open `/skills` from the affected project, select the Dwi module, cycle its state to `user-invocable-only`, and save. Claude Code records that local override in `.claude/settings.local.json`.

For a file-based repair, move the old directory outside `.claude/skills/` before testing. This prevents Claude Code from discovering the implicitly invocable backup beside the corrected artifact:

```bash
MODULE="dwi-conduct"
OLD="${PROJECT_ROOT}/.claude/skills/${MODULE}"
BACKUP_ROOT="${PROJECT_ROOT}/.claude/dwi-skill-backups"
BACKUP="${BACKUP_ROOT}/${MODULE}.before-explicit-only"
test -d "$OLD"
test ! -e "$BACKUP"
install -d "$BACKUP_ROOT"
mv "$OLD" "$BACKUP"
node "$DWI_ROOT/scripts/install-module.mjs" claude "$MODULE" "$OLD"
grep -Eq '^disable-model-invocation: true$' "$OLD/SKILL.md"
```

`BACKUP_ROOT` is outside `.claude/skills/`, so the old module is not part of the project skill discovery root during the fresh-session test. Keep the backup until both the negative test and explicit invocation test pass. Inspect and remove the exact backup afterward, or move it back only when intentionally rolling back.

## Remove a module

For Codex, remove only the two files installed by this guide, then remove directories only when empty:

```bash
TARGET="${PROJECT_ROOT}/.agents/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
test -f "$TARGET/agents/openai.yaml"
rm "$TARGET/agents/openai.yaml"
rmdir "$TARGET/agents"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

For Claude Code:

```bash
TARGET="${PROJECT_ROOT}/.claude/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

`rmdir` fails safely if a directory contains another file. Review that content instead of deleting recursively. For user-scoped installs, use the corresponding exact folder under `~/.agents/skills/` or `~/.claude/skills/`. Start a fresh session after removal.

## Stop conditions

Stop the trial if the module asks for more authority than the task requires, hides an external effect, conflicts with native harness controls, activates without the intended explicit invocation, installs into a different project than intended, or makes the workflow harder to understand. Removal is a valid result; no apology or continued trial is required.
