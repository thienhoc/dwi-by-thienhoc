# Checklist for the next reviewed release

Repository visibility, a development branch, a release tag, and deployment are separate states.

The current reviewed release is `v0.1.0`. The current `main` branch is development version `0.2.0-dev`.

Run:

```bash
npm run preflight:public
```

The command checks automatable gates and lists manual GitHub or human gates. A failure on a development branch is expected while release gates remain open.

## Blocking gates for v0.2.0

- [x] Development version is distinct from `v0.1.0`
- [x] `v0.1.0` has a versioned historical release record
- [x] All-in-One is marked unreleased
- [x] A machine-readable module catalog exists
- [x] English and Vietnamese module surfaces include All-in-One
- [x] Public issue forms include All-in-One
- [x] All-in-One has a relevance gate and silent fast path
- [x] Behavioral regression fixtures exist
- [x] Installable module checksums are current
- [ ] Current All-in-One revision passes a clean Codex project-scope install, invocation, and removal trial
- [ ] Current All-in-One revision passes a clean Claude Code project-scope install, invocation, and removal trial
- [ ] Current English and Vietnamese user-facing meaning passes human parity review
- [ ] Current visual assets pass human review for the intended release
- [ ] All current promotional claims have sourceable evidence and scoped wording
- [ ] Wi gives final copy approval for `v0.2.0`
- [ ] Wi gives explicit release and tag approval for `v0.2.0`

## Repository settings to confirm manually before release

- [ ] Default branch protection is active
- [ ] Repository validation is required before merge
- [ ] Secret scanning and push protection are enabled when available
- [ ] About description, website, and topics match `docs/repository-metadata.md`
- [ ] The approved 1280x640 social preview is configured on GitHub
- [ ] Issues and Discussions have an owner response policy
- [ ] A reviewed `v0.2.0` tag points to the exact approved commit
- [ ] All-in-One install documentation points only to the versioned reviewed tag

## Release truth

- A clean working tree does not sanitize prior commits.
- A passing static validator does not prove runtime behavior.
- A bounded harness observation does not prove universal compatibility.
- A development branch is not a release.
- A public repository is not automatically a supported product.
- A tag, visibility change, merge, or deployment requires its own authority.
