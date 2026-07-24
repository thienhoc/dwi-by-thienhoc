# Contributing

Thank you for helping Dwi become clearer, safer, and more useful.

## Current contribution status

The repository is in private Research Preview. Apache-2.0 applies to code and operational files; CC BY 4.0 applies to documentation and original assets. Public pull-request intake should open only after the history and privacy release gates pass.

## Contribution terms

By intentionally submitting a contribution, you confirm that you have the right to contribute it. Code and operational contributions are submitted under Apache-2.0. Documentation and original-asset contributions are submitted under CC BY 4.0. The path-level rules are in [LICENSES.md](LICENSES.md).

## Good contributions

- A smaller or clearer instruction that preserves the module's safety boundary
- A reproducible compatibility report with harness version and scope
- A translation correction that improves EN/VI meaning parity
- A failing example that reveals overplanning, overtesting, authority drift, hidden cost, or weak evidence
- An accessibility, security, or privacy improvement

## Before proposing a change

1. Read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
2. Choose one module or one repository concern.
3. State the user problem before the proposed mechanism.
4. Separate verified behavior from observation and inference.
5. Exclude secrets, private transcripts, personal data, and proprietary prompts.
6. Keep the change reversible and no larger than needed.

## Pull-request expectations

- One bounded purpose
- English and Vietnamese updates when user-facing meaning changes
- No website runtime, deployment configuration, or telemetry
- No new package dependency unless the problem cannot be solved with the standard library
- No universal performance, compatibility, savings, or safety claim
- Exact test or review evidence, including failures and omissions
- No commit, push, release, or visibility change performed by an agent without explicit human authority

## Module contract

Each installable module must remain self-contained:

- `modules/<name>/SKILL.md` holds the behavior.
- YAML frontmatter contains only `name` and `description`.
- `agents/openai.yaml` may add optional interface metadata.
- User-facing guidance belongs in `docs/modules/` and `docs/vi/modules/`.
- A module must declare non-goals, safety boundaries, and a removal path.

## Need help?

Use [SUPPORT.md](SUPPORT.md) or contact [hoc@wi.works](mailto:hoc@wi.works). Send security-sensitive reports through [SECURITY.md](SECURITY.md), not a public issue.
