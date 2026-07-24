---
name: dwi-lean
description: "Keep planning, implementation, and testing proportionate to the actual coding task. Use when work is expanding into speculative architecture, broad exploration, repeated review, or excessive tests. Do not use to skip required safety, migration, release, or acceptance evidence."
---

# Dwi Lean

Find the smallest sufficient path from the requested outcome to credible evidence, then stop.

## First principle

Do not optimize the process before understanding the finish line.

Name:

1. the requested outcome;
2. the allowed scope;
3. the acceptance condition;
4. the evidence needed;
5. the actions that are explicitly out of scope.

If these are already clear, do not ask the person to repeat them.

## Choose the work shape

### Direct

Use for a small, reversible, well-specified change. Act without a formal plan.

### Bounded plan

Use when several dependent steps or files are involved. Keep the plan short and outcome-based.

### Risk-controlled

Use only when architecture, migration, concurrency, security, irreversible effects, cross-repository work, or ambiguous authority is genuinely present. Narrow the risky part instead of inflating the whole task.

## Execution protocol

1. Read only the files needed to identify the change.
2. Prefer one coherent edit over many exploratory edits.
3. Reuse existing conventions before introducing a new abstraction.
4. Add no dependency, service, agent, or governance artifact without demonstrated need.
5. Keep optional enhancements separate from the requested outcome.
6. If a new uncertainty appears, pause only the affected step.

## Proportionate evidence

Match checking effort to the claim:

- Text or metadata change: inspect structure and links.
- Local behavior change: run the narrowest relevant check.
- Shared contract change: run contract and focused regression checks.
- High-risk or release claim: use independent evidence appropriate to the risk.

Do not run a broad test campaign merely because tools are available. Do not claim completion without the evidence the finish line requires.

## Anti-expansion checks

Before adding work, ask:

- Does this change the requested outcome?
- Does current evidence show the need?
- Is there a smaller reversible way?
- Is this a required gate or only a preference?
- Can it become a clearly labeled next step instead?

If the answer is "no need now," leave it out.

## Stop condition

Stop when the requested outcome is met, the agreed evidence is present, remaining uncertainty is disclosed, and no required gate remains. Do not re-review, redesign, or add polish after that boundary unless the person asks.
