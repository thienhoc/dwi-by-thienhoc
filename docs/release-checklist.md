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
- [x] The complete Git history is scanned for secrets, private data, website-only artifacts, telemetry, and asset-rights issues.
- [x] Wi confirms that no legacy private author identity appears in public history or the public tree.
- [x] Wi chooses between a sanitized new public repository and a reviewed history rewrite.
- [x] The selected history path is approved.
- [x] Original brand assets pass provenance and rights review.
- [x] The approved 1280×640 social preview has a reproducible export receipt.
- [x] SHA-256 checksums cover all six installable module files.
- [x] Every numeric promotional claim has a sourceable artifact, method, denominator, scope, and caveat.
- [x] Codex and Claude Code project-scope installs are tried from a clean environment.
- [x] Removal is tried from a clean environment.
- [x] English and Vietnamese module guides pass parity review.
- [x] Wi gives final visual approval.
- [x] Wi gives final copy approval.

## Repository settings after the gates pass

- [ ] Keep the default branch protected.
- [ ] Require the repository validation check before merge.
- [ ] Enable secret scanning and push protection when available.
- [ ] Set the About description, website, and topics from [repository-metadata.md](repository-metadata.md).
- [ ] Upload the approved 1280×640 raster at `assets/social-preview.png`.
- [ ] Enable issues and discussions only with an owner response policy.
- [ ] Create a reviewed version tag; update install links from `main` to that tag.

## Release truth

A clean `HEAD` does not sanitize prior commits. A passing offline validator does not prove runtime compatibility. A private preview is not a public release. Report each gate separately.
