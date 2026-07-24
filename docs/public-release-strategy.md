# Public-history strategy

The current reachable history was built as a website and contains landing code, telemetry imagery, hosting metadata, promotional artifacts, and a legacy private commit-author identity. A clean working tree does not remove those objects from history.

## Option A: clean public history

**Recommended.**

1. Keep the current repository private as evidence or rename it to an explicitly private archive.
2. Export only the validated community-package tree, excluding `.git`.
3. Add the selected license texts and license mapping.
4. Initialize a new history with an approved public author identity.
5. Run `npm test` and `npm run preflight:public` against that history.
6. Create a reviewed version tag.
7. Apply GitHub About, website, topics, social preview, protection, and visibility only with explicit Wi authority.

If retaining the public slug `thienhoc/dwi-by-thienhoc` matters, rename the private archive first and create the clean public repository at the original slug. Confirm redirect and link consequences before acting.

### Benefits

- Old website and telemetry objects are not intentionally carried into public history.
- Public authorship starts with the approved identity.
- The first commit describes the actual community package.
- No force-push rewrite is required.

### Cost

- The old website history remains in a separate private repository.
- Existing private commit identifiers are not part of the public lineage.
- Repository rename and creation are external effects requiring explicit approval.

## Option B: rewrite the existing repository

Use a reviewed history-rewrite tool to remove website paths, telemetry, hosting metadata, unwanted author identity, and other private content from every reachable commit.

### Risks

- Requires destructive force-push authority.
- Existing commit identifiers and clones become invalid.
- Pull-request, tag, cache, fork, and hidden-ref behavior needs separate review.
- Removing named paths does not prove all private content is gone.

Choose this only if preserving the repository object is more important than the simpler privacy boundary of a new clean history.

## Option C: publish the current history

**Rejected for launch.**

The current history contradicts the repository-only product boundary and exposes material that the working tree intentionally removed.

## Decision record

Wi must choose Option A or B and separately approve:

- public commit-author identity;
- public disclosure of legacy author metadata if retained;
- final public copy;
- push, tag, repository settings, and visibility effects.
