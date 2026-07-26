# Roadmap

## 0.1 Research Preview - released as v0.1.0

- [x] Remove website runtime and deployment code from the public repository boundary
- [x] Package six independent focused Agent Skills
- [x] Separate English and Vietnamese entry paths
- [x] Add safety, evidence, brand, community, and release-gate documentation
- [x] Add an offline repository contract checker
- [x] Add an offline public-release preflight
- [x] Select code, documentation, asset, and contribution licenses
- [x] Complete the selected public-history path
- [x] Complete the recorded privacy, secret, asset-rights, and claim-source review
- [x] Publish reviewed tag `v0.1.0`
- [x] Publish immutable install links for the six focused modules

See [the v0.1.0 release record](docs/releases/v0.1.0.md).

## 0.2 Research Preview - released as v0.2.0

- [x] Add optional All-in-One source packaging
- [x] Add a machine-readable module catalog
- [x] Add semantic validation for module surfaces and EN/VI parity
- [x] Add bounded compatibility evidence records from available observations
- [x] Add missing All-in-One examples and issue-form coverage
- [x] Add a relevance gate and silent fast path to All-in-One
- [x] Add behavioral regression fixtures
- [x] Complete the approved clean-harness, EN/VI, visual, evidence, and release reviews
- [x] Publish the reviewed `v0.2.0` tag
- [x] Publish immutable module-content links for all seven modules

See [the v0.2.0 release record](docs/releases/v0.2.0.md).

## 0.2.1 Documentation release - released as v0.2.1

- [x] Add Japanese, Korean, Simplified Chinese, French, and Hindi entry documentation
- [x] Define the translation boundary in `LANGUAGES.md`
- [x] Keep exact operational commands canonical in English and Vietnamese
- [x] Publish the reviewed `v0.2.1` tag

See [the v0.2.1 release record](docs/releases/v0.2.1.md).

## v0.2.2 tag conflict - not published

- [x] Detect that tag `v0.2.2` already points to pre-patch commit `4fdecbcccb2caf092a145517b2bdcc84e431de27`
- [x] Stop publication before moving or rewriting the existing tag
- [x] Preserve the ref as immutable historical evidence
- [x] Record that `v0.2.2` does not contain the installation-contract patch
- [x] Publish no GitHub Release for `v0.2.2`

See [the v0.2.2 non-release record](docs/releases/v0.2.2.md).

## 0.2.3 Installation-contract release - released as v0.2.3

- [x] Preserve `allow_implicit_invocation: false` in installed Codex artifacts
- [x] Add `disable-model-invocation: true` to installed Claude Code artifacts
- [x] Separate and canonicalize Dwi source and target project roots
- [x] Reject direct and symlinked destinations inside the Dwi source checkout
- [x] Move Claude repair backups outside the skill discovery root
- [x] Add installed-artifact and failure-path regression checks for both harnesses
- [x] Pass repository and installation contracts on Node.js 20 and 24
- [x] Record bounded clean-session runtime PASS observations for Codex and Claude Code
- [x] Preserve the occupied `v0.2.2` ref and advance the approved release to `v0.2.3`
- [x] Publish the reviewed `v0.2.3` tag and GitHub Release through the gated clean-lineage workflow

See [the v0.2.3 release record](docs/releases/v0.2.3.md).

## 0.2.4 Validation-hardening release - released as v0.2.4

- [x] Replace Codex policy substring matching with structural block-mapping validation
- [x] Reject quoted equivalent keys, false-like strings, duplicates, nested declarations, wrong indentation, flow mappings, and duplicate policy blocks
- [x] Preserve import-safe installer tests while allowing CLI execution through a symlinked entrypoint
- [x] Keep release validation pinned to the exact triggering `GITHUB_SHA`
- [x] Detect release records through an explicit first-parent diff
- [x] Add regression assertions for policy structure, symlinked CLI execution, and merge-commit release detection
- [x] Preserve canonical module bodies, checksums, and installed artifact shapes
- [x] Pass repository and installation contracts on Node.js 20 and 24
- [x] Resolve all actionable late review threads
- [x] Publish the reviewed `v0.2.4` tag and GitHub Release through the gated clean-lineage workflow

See [the v0.2.4 release record](docs/releases/v0.2.4.md).

## Later, only with evidence

- [ ] Consider additional harness adapters after bounded compatibility trials
- [ ] Consider generated public module indexes only if they reduce installation errors
- [ ] Consider additional languages only after English and Vietnamese parity remains reliable

No daemon, marketplace, browser extension, hosted control plane, hidden transcript store, or permission replacement is assumed by this roadmap.
