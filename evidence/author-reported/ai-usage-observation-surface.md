# Author-reported AI usage observation surface

## Claim

More than 20 billion gross tokens of documented, author-reported AI activity.

## Status

`ESTIMATED`

The two source values are visually observed in maintainer-provided screenshots. The combined figure is a reconciliation across two author-identified, distinct usage surfaces. It is not an independent audit.

## Owner and review date

- Owner: Trần Thiện Học, `@thienhoc`
- Evidence reviewed: 2026-07-25
- Purpose: describe the scale of sustained personal AI use that informed the Dwi observation surface

## Source A: author-identified Codex usage dashboard

Visible value used in this record:

- Lifetime tokens: `13.6B`

Additional visible context:

- Peak tokens: `1.9B`
- Total chats: `610`
- Current streak: `35 days`
- Longest streak: `35 days`

Artifact identity:

- Maintainer-provided screenshot
- Dimensions: `1656 × 1552`
- SHA-256: `6a05d9d9d31411906ee7177ab726810bed30be65c93937dbf17464227d2df21b`
- Platform identification is author-supplied. The visible screenshot does not independently establish the vendor name.

Evidence status for the displayed `13.6B` value: `OBSERVED`

## Source B: Claude Code and desktop analysis on one machine

Visible analysis scope:

- Window: `35 days`, from `2026-06-18` to `2026-07-23`
- Active days: `25 of 35`
- Gross total: `11,753.9M`, equal to `11.7539B`
- Cache read: `11,336.5M`, `96.4%`
- Cache create: `352.4M`
- New input: `7.9M`
- Output: `57.1M`
- Effective-new: `417.3M`, `3.6%`

Arithmetic check:

```text
11,336.5M + 352.4M + 7.9M + 57.1M = 11,753.9M
```

Visible exclusions and cautions:

- The source notes historical timestamp quirks and takes the bottom-line total at face value.
- The source covers Claude Code and desktop activity on one machine.
- It excludes `claude.ai` web activity and other vendors.
- This is a secondary analysis screenshot, not the raw local log export.

Artifact identity:

- Maintainer-provided screenshot
- Dimensions: `1234 × 1090`
- SHA-256: `c8b61974250dd0fb0ab8a34af112085a1ec660531723cd6f7cd7e754e2c3147c`

Evidence status for the displayed `11.7539B` gross value: `OBSERVED` as a screenshot value, with the underlying historical reconstruction remaining `ESTIMATED`.

## Reconciliation

The author identifies Source A and Source B as different product surfaces, so this record treats them as non-overlapping token accounting sources.

```text
13.6B + 11.7539B = 25.3539B gross tokens
```

The public statement is deliberately rounded down to:

> More than 20 billion gross tokens of documented, author-reported AI activity.

This avoids presenting the reconciled total with false precision.

## What this supports

This record supports a bounded statement about the scale of the author's personal AI usage and observation surface.

It can support statements such as:

> Dwi was shaped through more than 20 billion gross tokens of documented, author-reported AI activity across intensive coding, research, product, writing, and agent workflows.

## What this does not support

This record does not prove:

- that Dwi caused token savings;
- that Dwi improved speed, quality, or effectiveness;
- that cached input equals monetary savings;
- that the figure represents unique or effective-new tokens;
- that the dashboards use equivalent accounting definitions;
- that the total is an independently audited benchmark;
- that another user will obtain the same result;
- that one model or provider is superior.

## Artifact availability and limitation

The original screenshots were supplied directly by the maintainer for review and are identified above by cryptographic digest. They are not committed with this record because they contain account-level profile and third-party interface context.

A future public artifact package may replace the private screenshots with approved, rights-reviewed exports. Until then, every public use of the number must retain the labels `author-reported`, `gross`, and `not an independent benchmark`.