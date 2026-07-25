# Release checklist for Dwi v0.2.3

Repository visibility, a development branch, a release tag, and a GitHub Release are separate states.

The current release candidate is `v0.2.3`. The `v0.2.0` module-content record and `v0.2.1` documentation release remain historical. Tag `v0.2.2` is preserved as a non-release historical ref because it already pointed to a pre-patch commit.

Run:

```bash
npm run preflight:public
```

The command checks automatable gates and lists manual GitHub or human gates. Static validation does not replace runtime evidence.

## Blocking gates for v0.2.3

- [x] `v0.2.3` has a versioned release record prepared as the final publication commit.
- [x] Published tags `v0.1.0`, `v0.2.0`, and `v0.2.1` remain immutable.
- [x] Existing tag `v0.2.2` is recorded as a non-release tag at pre-patch commit `4fdecbcccb2caf092a145517b2bdcc84e431de27` and is not moved.
- [x] No GitHub Release is created for `v0.2.2`.
- [x] Codex installation includes `SKILL.md` and `agents/openai.yaml` with `allow_implicit_invocation: false`.
- [x] Claude Code installation contains exactly one `disable-model-invocation: true` field.
- [x] Canonical module bodies remain provider-neutral and unchanged.
- [x] The installer refuses to overwrite an existing module directory.
- [x] The installer rejects destinations that resolve inside the Dwi source checkout, including symlink aliases.
- [x] Claude repair backups are outside the `.claude/skills/` discovery root.
- [x] Installed-artifact regression checks cover all seven modules on both harnesses.
- [x] Repository and install contracts pass on Node.js 20 and 24.
- [x] Clean Codex fresh-session negative and explicit-invocation tests were reported PASS by Wi on 2026-07-26.
- [x] Clean Claude Code fresh-session negative and explicit-invocation tests were reported PASS by Wi on 2026-07-26.
- [x] Both actionable review threads on PR #5 were addressed and resolved.
- [x] English and Vietnamese installation meaning is aligned.
- [x] Localized entry documentation identifies `v0.2.3` as the current reviewed repository release.
- [x] Canonical module checksums remain current and unchanged from `v0.2.0`.
- [x] Release notes preserve bounded evidence wording and make no universal compatibility claim.
- [x] Wi explicitly requested publication of this installation-contract patch on 2026-07-26.
- [x] The version advances from the occupied `v0.2.2` tag to `v0.2.3` without changing approved release scope.
- [x] Release automation creates the immutable tag only from the exact triggering `main` commit after checks pass.
- [x] The release record contains `Release status: approved for publication` before automation may create a tag.

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

- Wi approved publication of the existing historical author identity through boundary commit `b15a45f00c03c325a12673123f685c32d1ecf8ab` only. Commits after that boundary must use the public release identity.
- Approved public release identities for new commits are `Trần Thiện Học <hoc@wi.works>` and `Trần Thiện Học <hoctt@icloud.com>`.
- A clean working tree does not sanitize prior commits.
- A passing static validator does not prove runtime behavior.
- A bounded harness observation does not prove universal compatibility.
- A development branch is not a release.
- A public repository is not automatically a supported product.
- A merge, tag, release, visibility change, or deployment requires its own authority.
