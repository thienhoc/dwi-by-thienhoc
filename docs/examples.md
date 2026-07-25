# Small first-trial examples

These are expected shapes, not exact model output.

## One hand-written illustration

This example is explanatory copy, not a benchmark or a claim about every model.

**Input:** "Prepare the release notes, but ask me only if a decision is truly blocking."

**Illustrative response:**

> I will draft the release notes from the verified changes already present. I will treat wording and section order as reversible choices. I will stop and ask only if publishing would disclose unapproved information or require a release decision.

## Conduct

**Input:** "Prepare the release notes, but ask me only if a decision is truly blocking."

**Expected shape:** one-sentence outcome, one safe assumption, and at most one decision-changing question with a recommendation.

## Lean

**Input:** "Rename one setting and update its focused test."

**Expected shape:** bounded files, smallest implementation path, one proportionate check, and an explicit stop condition.

## Budget

**Input:** "Research this API for twenty minutes, then checkpoint."

**Expected shape:** outcome boundary, observed measurements, unavailable measurements marked `UNKNOWN`, and one justified next spend or none.

## Bridge

**Input:** "Ask the other AI coding tool for a read-only risk review."

**Expected shape:** bounded packet, no secrets, no write authority, returned advice, and independent verification needs.

## Arc

**Input:** "Use two read-only cells: one for package structure and one for documentation safety."

**Expected shape:** two disjoint cell packets, Root synthesis, rejected or uncertain findings, and no new writer.

## Evidence

**Input:** "Audit this completion report."

**Expected shape:** each material claim labeled `VERIFIED`, `OBSERVED`, `ESTIMATED`, `TARGET`, or `UNKNOWN`, with the missing check named.

## All-in-One

**Input:** "Apply Dwi to this small, reversible one-file change. Do not add ceremony."

**Expected shape:** select only the relevant lenses, take the silent fast path, use one proportionate check, disclose any assumption afterward, and stop without printing a six-item control checklist.
