# Install one module, inspect first

Dwi is a modular human layer. Each module is distributed as agent-native instructions; harnesses that support the open Agent Skills format load the required behavior from `SKILL.md`. There is no separate Dwi installer service, daemon, runtime package, MCP server, or website dependency. A supported AI coding tool such as Codex or Claude Code is still required.

## Before installing

1. Choose one module from [MODULES.md](../MODULES.md).
2. Read its `SKILL.md` in the repository.
3. Confirm its effects, non-goals, permission boundaries, and removal path.
4. Use project scope for the first trial.
5. Choose a reversible task with no secrets and no external side effects.

Do not pipe an unreviewed remote script into a shell.


## Install a different focused module

For a released remote source URL or a local focused-module path, replace `dwi-conduct` with one of:

```text
dwi-lean
dwi-budget
dwi-bridge
dwi-arc
dwi-evidence
```

## All-in-One development trial (not in v0.1.0)

`dwi-all-in-one` is unreleased development content. It has no reviewed release tag or immutable install URL.

Do not install it from mutable `main`. A contributor may inspect and test it only from a local checkout pinned to an exact commit. A pull-request branch or commit is not a reviewed release.

From that pinned local checkout:

```bash
pwd -P
SOURCE="modules/dwi-all-in-one/SKILL.md"
TARGET=".agents/skills/dwi-all-in-one"
test -f "$SOURCE"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$SOURCE" "$TARGET/SKILL.md"
cmp "$SOURCE" "$TARGET/SKILL.md"
```

For Claude Code, use the same source with target `.claude/skills/dwi-all-in-one`.

## Public release: pinned module URLs

Each focused module has its own immutable `v0.1.0` source URL:

| Module | Reviewed source |
| --- | --- |
| Conduct | [dwi-conduct/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-conduct/SKILL.md) |
| Lean | [dwi-lean/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-lean/SKILL.md) |
| Budget | [dwi-budget/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-budget/SKILL.md) |
| Bridge | [dwi-bridge/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-bridge/SKILL.md) |
| Arc | [dwi-arc/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-arc/SKILL.md) |
| Evidence | [dwi-evidence/SKILL.md](https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/v0.1.0/modules/dwi-evidence/SKILL.md) |

`dwi-all-in-one` is not yet included in a tagged install URL.

Download the selected file and the release checksum manifest, verify SHA-256, inspect the file, and only then install:

```bash
RELEASE_REF="v0.1.0"
MODULE="dwi-conduct"
TMP_SKILL="/tmp/${MODULE}.SKILL.md"
TMP_SUMS="/tmp/dwi-${RELEASE_REF}-SHA256SUMS"
curl -fsSL \
  "https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/${RELEASE_REF}/modules/${MODULE}/SKILL.md" \
  -o "$TMP_SKILL"
curl -fsSL \
  "https://raw.githubusercontent.com/thienhoc/dwi-by-thienhoc/${RELEASE_REF}/checksums/SHA256SUMS" \
  -o "$TMP_SUMS"
EXPECTED="$(awk -v file="modules/${MODULE}/SKILL.md" '$2 == file {print $1}' "$TMP_SUMS")"
ACTUAL="$(shasum -a 256 "$TMP_SKILL" | awk '{print $1}')"
test -n "$EXPECTED"
test "$ACTUAL" = "$EXPECTED"
less "$TMP_SKILL"
```

After review, install without overwriting an existing skill:

```bash
TARGET=".agents/skills/${MODULE}"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 "$TMP_SKILL" "$TARGET/SKILL.md"
cmp "$TMP_SKILL" "$TARGET/SKILL.md"
```

For Claude Code, change only the target root to `.claude/skills/`.

## Remove a module

Remove only the file installed by this guide, then remove the directory only if it is empty:

```bash
TARGET=".agents/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

or:

```bash
TARGET=".claude/skills/dwi-conduct"
test -f "$TARGET/SKILL.md"
rm "$TARGET/SKILL.md"
rmdir "$TARGET"
```

`rmdir` fails safely if the folder contains another file. Review that content instead of deleting it recursively. For user-scoped installs, use the corresponding exact folder under `~/.agents/skills/` or `~/.claude/skills/`. Start a fresh session after removal.

## Stop conditions

Stop the trial if the module asks for more authority than the task requires, hides an external effect, conflicts with native harness controls, or makes the workflow harder to understand. Removal is a valid result; no apology or continued trial is required.
