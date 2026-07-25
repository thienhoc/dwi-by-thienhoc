# Contributing

Thank you for helping Dwi become clearer, safer, and more useful.

## Current contribution status

The repository is a public Research Preview. Issues and pull requests may be submitted, but review or response time is not guaranteed.

Apache-2.0 applies to code and operational files. CC BY 4.0 applies to documentation and original assets. Brand use remains governed separately by [TRADEMARKS.md](TRADEMARKS.md).

## Contribution terms

By intentionally submitting a contribution, you confirm that you have the right to contribute it.

- Code and operational contributions are submitted under Apache-2.0.
- Documentation and original-asset contributions are submitted under CC BY 4.0.
- The path-level rules are in [LICENSES.md](LICENSES.md).
- A contribution does not grant permission to use Dwi branding as the primary identity of a modified distribution.

## Good contributions

- A smaller or clearer instruction that preserves the module's safety boundary
- A reproducible compatibility report with harness version and scope
- A translation correction that improves English and Vietnamese meaning parity
- A failing example that reveals overplanning, overtesting, authority drift, hidden cost, weak evidence, or unnecessary ceremony
- An accessibility, security, privacy, or installation-safety improvement
- A validator change that prevents a known repository truth from drifting

## Before proposing a change

1. Read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
2. Choose one module or one repository concern.
3. State the observable user problem before the proposed mechanism.
4. Separate verified behavior, bounded observation, estimate, target, and unknown.
5. Exclude secrets, private transcripts, personal data, and proprietary prompts.
6. Keep the change reversible and no larger than needed.
7. Update English and Vietnamese surfaces together when user-facing meaning changes.
8. Add or update a behavioral fixture when module behavior changes.

## Pull-request expectations

- One bounded purpose
- No direct write to `main`
- English and Vietnamese updates when user-facing meaning changes
- No website runtime, deployment configuration, hidden service, or telemetry
- No new package dependency unless an approved decision records why the standard library is insufficient
- No universal performance, compatibility, savings, or safety claim
- Exact test or review evidence, including failures, omissions, and remaining unknowns
- No commit, push, release, merge, deployment, visibility change, or disclosure by an agent without the required human authority

## Module contract

Each installable module must remain self-contained:

- `modules/<name>/SKILL.md` holds the behavior.
- YAML frontmatter contains only `name` and `description`.
- `agents/openai.yaml` may add optional interface metadata.
- User-facing guidance belongs in `docs/modules/` and `docs/vi/modules/`.
- A module declares its triggers, non-goals, safety boundaries, and stop condition.
- Focused modules remain the primary product units.
- All-in-One remains a composition preset and does not create a seventh authority layer.
- Module inventory and release availability are recorded in `modules/catalog.json`.

## Need help?

Use [SUPPORT.md](SUPPORT.md) or contact [hoc@wi.works](mailto:hoc@wi.works).

Send security-sensitive reports through [SECURITY.md](SECURITY.md), not a public issue.
