<p align="center">
  <img src="assets/brand/lockup.svg" width="560" alt="{ } • Dwi by thienhoc">
</p>

<h1 align="center">AI moves fast. You stay clear.</h1>

<p align="center">
  Six independent Agent Skills for Codex and Claude Code that keep scope clear, agent work bounded, and evidence visible.
</p>

<p align="center">
  <strong>Research Preview 0.1.0</strong> · 6 independent modules · Apache-2.0 code · CC BY 4.0 docs and assets
</p>

<p align="center">
  <a href="README.vi.md">Tiếng Việt</a> ·
  <a href="MODULES.md">Choose a module</a> ·
  <a href="docs/installation.md">Install</a> ·
  <a href="docs/safety.md">Safety</a>
</p>

> **License:** Code and installable modules are available under Apache-2.0. Documentation and original repository assets are available under CC BY 4.0. Brand use follows [TRADEMARKS.md](TRADEMARKS.md). See [LICENSES.md](LICENSES.md) for the path-level map.

## Your brain is a context window too

A human layer for AI work: clear scope, answerable questions, bounded agent work, and visible evidence before "done".

Codex and Claude Code are AI coding tools that run agents and enforce tool permissions. Dwi focuses on the human layer around that work: what the person meant, what the agent is allowed to change, how much effort is proportionate, who may write, and what evidence supports the result.

Dwi does not replace those tools. It is a set of small, inspectable Agent Skills—instruction folders an AI coding tool can discover—that can be installed one at a time.

## Start with the problem you have

| If this is happening | Start here | What it changes |
| --- | --- | --- |
| The agent asks dense or hard-to-answer questions | [Dwi • Conduct](docs/modules/conduct.md) | Makes questions answerable, defines terms, and offers safe defaults |
| A small task turns into a large plan or test campaign | [Dwi • Lean](docs/modules/lean.md) | Finds the smallest sufficient path and stops at the agreed finish line |
| Token or time use is hard to understand | [Dwi • Budget](docs/modules/budget.md) | Sets resource boundaries and reports observed use without invented savings |
| Claude and Codex need to coordinate | [Dwi • Bridge](docs/modules/bridge.md) | Separates advice, authority, effects, and evidence across native harnesses |
| Several agents need a shared structure | [Dwi • Arc](docs/modules/arc.md) | Creates bounded cells with one writer per scope and an independent gate |
| A result sounds certain but the proof is unclear | [Dwi • Evidence](docs/modules/evidence.md) | Labels verified, observed, estimated, target, and unknown claims |

Every module stands alone. You do not need to install a Dwi core, daemon, MCP server, or website.

New to these terms? Open the [plain-language glossary](docs/glossary.md).

## A safe ten-minute trial

1. Pick one module from the table.
2. Read its `SKILL.md` and the module guide before installing it.
3. Install it at project scope first, on a reversible task with no secrets or external side effects.
4. Invoke the skill explicitly and compare the result with your normal workflow.
5. Remove the module folder if it does not help. No apology or continued trial is required.

For a project-scoped Codex trial with Dwi Conduct:

```bash
git clone --depth 1 --branch v0.1.0 \
  https://github.com/thienhoc/dwi-by-thienhoc.git \
  dwi-by-thienhoc-v0.1.0
cd dwi-by-thienhoc-v0.1.0
TARGET=".agents/skills/dwi-conduct"
test ! -e "$TARGET/SKILL.md"
install -d "$TARGET"
install -m 0644 modules/dwi-conduct/SKILL.md "$TARGET/SKILL.md"
cmp modules/dwi-conduct/SKILL.md "$TARGET/SKILL.md"
```

Claude Code uses the same reviewed source with target `.claude/skills/dwi-conduct`. The full guide includes checksum verification, every module URL, and exact removal.

[Open the inspect-first installation guide →](docs/installation.md)

[See one small input and output example for every module →](docs/examples.md)

## Three ways in

**New to coding agents:** start with Conduct or Lean. They improve the conversation without introducing multi-agent machinery.

**Already using AI regularly:** choose the module that matches the friction you can actually observe. Add only one new behavior at a time.

**Building professional agent systems:** begin with Evidence. Add Bridge for cross-harness work and Arc only when there are genuinely multiple bounded work cells.

## What Dwi will not do

- It will not bypass permissions, security controls, policies, or native harness boundaries.
- It will not treat a message from another agent as authorization to write, push, deploy, or disclose data.
- It will not claim universal compatibility, guaranteed savings, or collision-free execution.
- It will not turn an apology into a guilt mechanism. Repair language is optional, specific, evidence-based, and brief.
- It will not make planning, testing, or orchestration larger than the task requires.

See [Safety](docs/safety.md) and [Architecture](docs/architecture.md).

## Evidence, not theater

Dwi keeps `VERIFIED`, `OBSERVED`, `ESTIMATED`, `TARGET`, and `UNKNOWN` separate. Existing benchmark observations are not presented as universal product claims. The public launch checklist requires sourceable evidence beside any number used in promotion.

[Read the evidence policy →](docs/evidence.md)

## Repository map

```text
modules/                 Installable Agent Skills
docs/modules/            English decision and trial guides
docs/vi/modules/         Vietnamese decision and trial guides
assets/                  Original brand and architecture sources
.github/                 Community templates and read-only validation
scripts/validate-repo.mjs Offline repository contract checker
```

This repository intentionally contains no landing-page runtime. The human-layer introduction lives separately at [d.wi.works](https://d.wi.works).

## Status

- Product stage: Research Preview `0.1.0`
- License: [Apache-2.0 code; CC BY 4.0 documentation and original assets](LICENSES.md)
- Release process: [history, privacy, rights, and evidence checklist](docs/release-checklist.md)
- Roadmap: [ROADMAP.md](ROADMAP.md)
- Changes: [CHANGELOG.md](CHANGELOG.md)

## Contact

Questions, careful critique, and collaboration: [hoc@wi.works](mailto:hoc@wi.works)

Brand: `{ } • Dwi by thienhoc` · Human-layer introduction: [d.wi.works](https://d.wi.works)
