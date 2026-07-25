# Choose one Dwi module

Dwi is intentionally modular. Install the smallest behavior that addresses a problem you can observe.

| Module | Choose it when | Canonical source | English guide | Vietnamese guide |
| --- | --- | --- | --- | --- |
| `dwi-conduct` | Questions are opaque, cognitively heavy, or need a kinder repair path | [`SKILL.md`](modules/dwi-conduct/SKILL.md) + [Codex metadata](modules/dwi-conduct/agents/openai.yaml) | [Conduct](docs/modules/conduct.md) | [Conduct VI](docs/vi/modules/conduct.md) |
| `dwi-lean` | Planning or testing is expanding beyond the actual task | [`SKILL.md`](modules/dwi-lean/SKILL.md) + [Codex metadata](modules/dwi-lean/agents/openai.yaml) | [Lean](docs/modules/lean.md) | [Lean VI](docs/vi/modules/lean.md) |
| `dwi-budget` | Token, time, or context use needs an honest boundary | [`SKILL.md`](modules/dwi-budget/SKILL.md) + [Codex metadata](modules/dwi-budget/agents/openai.yaml) | [Budget](docs/modules/budget.md) | [Budget VI](docs/vi/modules/budget.md) |
| `dwi-bridge` | Native Claude and Codex workflows need explicit coordination | [`SKILL.md`](modules/dwi-bridge/SKILL.md) + [Codex metadata](modules/dwi-bridge/agents/openai.yaml) | [Bridge](docs/modules/bridge.md) | [Bridge VI](docs/vi/modules/bridge.md) |
| `dwi-arc` | Multiple bounded work cells need one-writer discipline | [`SKILL.md`](modules/dwi-arc/SKILL.md) + [Codex metadata](modules/dwi-arc/agents/openai.yaml) | [Arc](docs/modules/arc.md) | [Arc VI](docs/vi/modules/arc.md) |
| `dwi-evidence` | Claims need status, provenance, and visible uncertainty | [`SKILL.md`](modules/dwi-evidence/SKILL.md) + [Codex metadata](modules/dwi-evidence/agents/openai.yaml) | [Evidence](docs/modules/evidence.md) | [Evidence VI](docs/vi/modules/evidence.md) |
| `dwi-all-in-one` | Multiple observed issues recur together and you want one module | [`SKILL.md`](modules/dwi-all-in-one/SKILL.md) + [Codex metadata](modules/dwi-all-in-one/agents/openai.yaml) | [All-in-One](docs/modules/all-in-one.md) | [All-in-One VI](docs/vi/modules/all-in-one.md) |

## Independence contract

Each focused module:

- has one self-contained canonical `SKILL.md` for its behavioral instructions;
- can be installed without another Dwi module;
- declares what it changes and what it does not change;
- requires no separate Dwi runtime, daemon, package dependency, MCP server, or website;
- preserves native harness permission checks;
- has an exact removal path.

`dwi-all-in-one` is an optional composition module. Use it only when multiple observed problems recur in the same workflow. It adds no new authority layer and must not force all six lenses onto every task.

A complete explicit-only installation is harness-specific:

- Codex installs canonical `SKILL.md` together with `agents/openai.yaml`, where `allow_implicit_invocation: false` is required.
- Claude Code installs a rendered copy of canonical `SKILL.md` with `disable-model-invocation: true` added to frontmatter.

Use the reviewed installer rather than copying only `SKILL.md`.

## Installation scope

| Harness | Project scope | User scope |
| --- | --- | --- |
| Codex | `.agents/skills/<module>/SKILL.md` + `.agents/skills/<module>/agents/openai.yaml` | `~/.agents/skills/<module>/SKILL.md` + `~/.agents/skills/<module>/agents/openai.yaml` |
| Claude Code | `.claude/skills/<module>/SKILL.md` rendered for Claude | `~/.claude/skills/<module>/SKILL.md` rendered for Claude |

Project scope is recommended for the first trial. See [the complete installation and removal guide](docs/installation.md) and [small expected-output examples](docs/examples.md).

## Version references

- `v0.2.2` is the latest reviewed repository release and corrects the explicit-only installation contract.
- Canonical module bodies and SHA-256 values remain unchanged from `v0.2.0`.
- `v0.2.1` remains the historical documentation-localization patch.
- `v0.1.0` remains the historical focused-module release.
- Do not install from mutable `main`.
- A remote install reference must use a reviewed tag or exact reviewed commit.
- Module identity and module-content availability are recorded in [`modules/catalog.json`](modules/catalog.json).
