# Release checklist for Dwi v0.2.5

Repository visibility, a development branch, a release tag, and a GitHub Release are separate states.

The current release candidate is `v0.2.5`. Release `v0.2.4` remains immutable. This patch hardens the Codex metadata validator and its regression architecture without changing canonical module content or installed artifact shapes.

Run:

```bash
npm run preflight:public
```

The command checks automatable gates and lists manual GitHub or human gates. Static validation does not replace runtime evidence.

## Blocking gates for v0.2.5

- [x] `v0.2.5` has a versioned release record.
- [x] `v0.2.4` remains immutable and valid.
- [x] Canonical module bodies and SHA-256 values remain unchanged from `v0.2.0`.
- [x] Codex and Claude installed artifact shapes remain unchanged from `v0.2.3`.
- [x] Production installation uses one import-safe Codex metadata validator module.
- [x] The validator accepts only the canonical top-level `interface` and `policy` schema.
- [x] The validator requires exactly one unquoted direct `policy.allow_implicit_invocation` child with YAML boolean value `false`.
- [x] Mapping values and mapping comments require YAML separation after `:`.
- [x] Policy comments require separation before `#`; `false#note` is rejected.
- [x] Multiline quoted scalars, block scalars, flow collections, anchors, aliases, custom tags, directives, document markers, sequences, explicit mapping keys, BOM input, and tabs anywhere in metadata are rejected.
- [x] Plain scalars reject reserved leading indicators, unsafe mapping separators, and control characters.
- [x] The schema rejects unknown top-level keys, unsupported interface keys, duplicate fields, and extra policy controls.
- [x] The dedicated adversarial suite starts from canonical valid metadata, changes one target property per fixture, and asserts the targeted rejection reason.
- [x] The adversarial suite covers 3 accepted and 30 targeted rejected fixtures.
- [x] `npm test` includes repository validation, the dedicated adversarial suite, and the complete installed-artifact contract.
- [x] Public-release preflight reruns the dedicated adversarial suite and installed-artifact contract.
- [x] Repository and install contracts pass on Node.js 20 and 24 for commit `29436c8666970694b20264115992e3612bd47620` in workflow run `30184205631`.
- [x] All seven modules pass Codex and Claude Code installed-artifact checks.
- [x] Existing overwrite, malformed-target, source-checkout containment, symlink-alias, symlinked-entrypoint, documentation, and cleanup checks remain active.
- [x] The two late actionable review threads on PR #8 were documented against PR #9 and resolved.
- [x] All six actionable review threads produced on PR #9 through commit `8fd5b2f0ef6d6ffdd26b5796a841ea5a92c360dd` were addressed and resolved.
- [ ] Codex completes a final review of commit `29436c8666970694b20264115992e3612bd47620` with no new actionable findings.
- [x] Wi explicitly authorized completing and publishing `v0.2.5` immediately on 2026-07-26.
- [ ] The exact `Release status: approved for publication` marker is added only after the final review gate closes.
- [x] The clean-lineage workflow remains configured to create a tree-equivalent public-identity commit, run public-release preflight, push the immutable `v0.2.5` tag, verify the remote tag target, and create the GitHub Release.

## Blocking gates for v0.2.4

This historical section records the completed validation-hardening release.

- [x] `v0.2.4` has a versioned release record.
- [x] `v0.2.3` remains immutable and valid.
- [x] Canonical module bodies and SHA-256 values remain unchanged from `v0.2.0`.
- [x] Codex and Claude installed artifact shapes remain unchanged from `v0.2.3`.
- [x] The production installer exports and uses one structural Codex metadata validator.
- [x] The validator requires exactly one active `allow_implicit_invocation` declaration.
- [x] The declaration must be an unquoted direct child of the single unquoted top-level `policy` block, use canonical indentation, and have boolean value `false`.
- [x] Importing `scripts/install-module.mjs` does not execute the CLI entrypoint.
- [x] Calling the installer through a symlinked entrypoint executes the CLI and creates the complete artifact.
- [x] Release automation remains pinned to the triggering `GITHUB_SHA` and compares it with its first parent.
- [x] Repository and install contracts passed on Node.js 20 and 24.
- [x] PR #8 was squash-merged after checks passed.
- [x] Wi explicitly authorized completing and publishing this patch on 2026-07-26.

## Blocking gates for v0.2.3

This historical section records the completed installation-contract release.

- [x] Codex installation includes `SKILL.md` and `agents/openai.yaml` with `allow_implicit_invocation: false`.
- [x] Claude Code installation contains exactly one `disable-model-invocation: true` field.
- [x] The installer rejects overwrites, source-checkout containment, and symlink aliases.
- [x] Claude repair backups are outside the `.claude/skills/` discovery root.
- [x] Installed-artifact regression checks cover all seven modules on both harnesses.
- [x] Repository and install contracts passed on Node.js 20 and 24.
- [x] Clean Codex and Claude Code fresh-session tests were reported PASS by Wi on 2026-07-26.
- [x] The release used a clean publication commit with the exact reviewed tree and approved public identity.
- [x] Tag `v0.2.3` and its GitHub Release were published successfully.

## Blocking gates for v0.2.0

This historical section is retained for the existing public-release preflight contract.

- [x] `v0.2.0` is distinct from the historical `v0.1.0` release
- [x] `v0.2.0` has a versioned release record
- [x] All-in-One is released as an optional composition module
- [x] A machine-readable module catalog exists
- [x] English and Vietnamese module surfaces include All-in-One
- [x] Public issue forms include All-in-One
- [x] All-in-One has a relevance gate and silent fast path
- [x] Behavioral regression fixtures exist
- [x] Installable module checksums are current
- [x] Current All-in-One revision passes the approved clean Codex project-scope install, invocation, and removal trial
- [x] Current All-in-One revision passes the approved clean Claude Code project-scope install, invocation, and removal trial
- [x] Current English and Vietnamese user-facing meaning passes human parity review
- [x] Current visual assets pass human review for the intended release
- [x] All current promotional claims have sourceable evidence and scoped wording
- [x] Wi gives final copy approval for `v0.2.0`
- [x] Wi gives explicit release and tag approval for `v0.2.0`

## Repository settings to confirm manually before release

- [x] Default branch protection is active
- [x] Repository validation is required before merge
- [x] Secret scanning and push protection are enabled when available
- [x] About description, website, and topics match `docs/repository-metadata.md`
- [x] The approved 1280x640 social preview is configured on GitHub
- [x] Issues and Discussions have an owner response policy
- [x] Existing reviewed tags point to their exact approved commits
- [x] The publication job uses `contents: write` only for the reviewed tag and GitHub Release operation

## Release truth

- Wi approved publication of the existing historical author identity through boundary commit `b15a45f00c03c325a12673123f685c32d1ecf8ab` only. Commits after that boundary in the release lineage must use the public release identity.
- Approved public release identities for new commits are `Trần Thiện Học <hoc@wi.works>` and `Trần Thiện Học <hoctt@icloud.com>`.
- A release tag may point to a clean publication commit whose commit SHA differs from the reviewed `main` commit, but its tree SHA must be identical.
- A clean release lineage does not rewrite or sanitize the existing `main` history.
- A clean working tree does not sanitize prior commits.
- A passing static validator does not prove runtime behavior.
- A bounded harness observation does not prove universal compatibility.
- A development branch is not a release.
- A public repository is not automatically a supported product.
- A merge, tag, release, visibility change, or deployment requires its own authority.
