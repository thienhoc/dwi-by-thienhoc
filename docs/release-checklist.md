# Public release checklist

Public visibility, a release, a tag, and deployment are separate actions. None is authorized by this refactor.

Run:

```bash
npm run preflight:public
```

The command checks automatable gates and lists the GitHub actions that still require manual evidence.

## Blocking gates

- [x] Wi selects the code, documentation, and asset licenses.
- [x] Final license texts and notice files are added.
- [ ] The complete Git history is scanned for secrets, private data, website-only artifacts, telemetry, and asset-rights issues.
- [ ] Wi confirms that no legacy private author identity appears in public history or the public tree.
- [ ] Wi chooses between a sanitized new public repository and a reviewed history rewrite.
- [ ] The selected history path follows [public-release-strategy.md](public-release-strategy.md).
- [x] Original brand assets pass provenance and rights review.
- [x] The approved 1280×640 social preview has a reproducible export receipt.
- [x] SHA-256 checksums cover all six installable module files.
- [ ] Every numeric promotional claim has a sourceable artifact, method, denominator, scope, and caveat.
- [ ] Codex and Claude Code project-scope installs are tried from a clean environment.
- [ ] Removal is tried from a clean environment.
- [ ] English and Vietnamese module guides pass parity review.
- [x] Wi gives final visual approval.
- [ ] Wi gives final copy approval.

## Repository settings after the gates pass

- [ ] Keep the default branch protected.
- [ ] Require the repository validation check before merge.
- [ ] Enable secret scanning and push protection when available.
- [ ] Set the About description, website, and topics from [repository-metadata.md](repository-metadata.md).
- [ ] Upload the approved 1280×640 social preview exported from `assets/social-preview.svg`.
- [ ] Enable issues and discussions only with an owner response policy.
- [ ] Create a reviewed version tag; update install links from `main` to that tag.

## Release truth

A clean `HEAD` does not sanitize prior commits. A passing offline validator does not prove runtime compatibility. A private preview is not a public release. Report each gate separately.
