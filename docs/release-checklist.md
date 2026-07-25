# Release checklist for Dwi v0.2.0

Repository visibility, a development branch, a release tag, and deployment are separate states.

The current reviewed release is `v0.2.0`. The `v0.1.0` record remains historical.

Run:

```bash
npm run preflight:public
```

The command checks automatable gates and lists manual GitHub or human gates. Static validation does not replace runtime evidence.

## Blocking gates for v0.2.0

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
- [x] A reviewed `v0.2.0` tag points to the exact approved commit
- [x] All-in-One install documentation points only to the versioned reviewed tag

## Release truth

- Wi approved publication of the existing historical author identity through boundary commit `b15a45f00c03c325a12673123f685c32d1ecf8ab` only. Commits after that boundary must use the public release identity.
- Approved public release identities for new commits are `Trần Thiện Học <hoc@wi.works>` and `Trần Thiện Học <hoctt@icloud.com>`.
- A clean working tree does not sanitize prior commits.
- A passing static validator does not prove runtime behavior.
- A bounded harness observation does not prove universal compatibility.
- A development branch is not a release.
- A public repository is not automatically a supported product.
- A tag, visibility change, merge, or deployment requires its own authority.
