# Choose one Dwi module

Dwi is intentionally modular. Install the smallest behavior that addresses a problem you can observe.

| Module | Choose it when | Required files | English guide | Vietnamese guide |
| --- | --- | --- | --- | --- |
| `dwi-conduct` | Questions are opaque, cognitively heavy, or need a kinder repair path | [`SKILL.md`](modules/dwi-conduct/SKILL.md) | [Conduct](docs/modules/conduct.md) | [Conduct VI](docs/vi/modules/conduct.md) |
| `dwi-lean` | Planning or testing is expanding beyond the actual task | [`SKILL.md`](modules/dwi-lean/SKILL.md) | [Lean](docs/modules/lean.md) | [Lean VI](docs/vi/modules/lean.md) |
| `dwi-budget` | Token, time, or context use needs an honest boundary | [`SKILL.md`](modules/dwi-budget/SKILL.md) | [Budget](docs/modules/budget.md) | [Budget VI](docs/vi/modules/budget.md) |
| `dwi-bridge` | Native Claude and Codex workflows need explicit coordination | [`SKILL.md`](modules/dwi-bridge/SKILL.md) | [Bridge](docs/modules/bridge.md) | [Bridge VI](docs/vi/modules/bridge.md) |
| `dwi-arc` | Multiple bounded work cells need one-writer discipline | [`SKILL.md`](modules/dwi-arc/SKILL.md) | [Arc](docs/modules/arc.md) | [Arc VI](docs/vi/modules/arc.md) |
| `dwi-evidence` | Claims need status, provenance, and visible uncertainty | [`SKILL.md`](modules/dwi-evidence/SKILL.md) | [Evidence](docs/modules/evidence.md) | [Evidence VI](docs/vi/modules/evidence.md) |
| `dwi-all-in-one` | Multiple observed issues recur together and you want one module | [`SKILL.md`](modules/dwi-all-in-one/SKILL.md) | [All-in-One](docs/modules/all-in-one.md) | [All-in-One VI](docs/vi/modules/all-in-one.md) |

## Independence contract

Each focused module:

- has one self-contained `SKILL.md`;
- can be installed without another Dwi module;
- declares what it changes and what it does not change;
- requires no separate Dwi runtime, daemon, package dependency, MCP server, or website;
- preserves native harness permission checks;
- has an exact removal path.

`dwi-all-in-one` is an optional composition module. Use it only when multiple observed problems recur in the same workflow. It adds no new authority layer and must not force all six lenses onto every task.

`agents/openai.yaml` adds optional Codex interface metadata. The core behavior remains in `SKILL.md`, following the open Agent Skills format.

## Installation scope

| Harness | Project scope | User scope |
| --- | --- | --- |
| Codex | `.agents/skills/<module>/SKILL.md` | `~/.agents/skills/<module>/SKILL.md` |
| Claude Code | `.claude/skills/<module>/SKILL.md` | `~/.claude/skills/<module>/SKILL.md` |

Project scope is recommended for the first trial. See [the complete installation and removal guide](docs/installation.md) and [small expected-output examples](docs/examples.md).

## Version references

- `v0.2.0` is the latest reviewed release and contains six focused modules plus the optional All-in-One composition module.
- Every released module has a versioned remote source under its release tag; never install from mutable `main`.
- `v0.1.0` remains the historical focused-module release.
- Do not install from mutable `main`.
- A remote install reference must use a reviewed tag or exact reviewed commit.
- Module identity and release availability are recorded in [`modules/catalog.json`](modules/catalog.json).
