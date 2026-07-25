# How Dwi works

Dwi gives work a visible shape before an agent moves.

It does not add a hidden runtime or replace the native permission model. It adds inspectable instructions that keep the outcome, scope, authority, ownership, resources, and evidence explicit inside an existing agent workflow.

## Start with a packet

A packet is one complete piece of work. It tells the agent:

| Field | Question |
| --- | --- |
| Intent | What needs to become true? |
| Context | What does the agent need to know? |
| Authority | What may it read, change, decide, or cause? |
| Evidence | What must return before the result is trusted? |

A useful packet also names:

- the finish line;
- the mutable scope;
- what must not be touched;
- the writer for that scope;
- the smallest sufficient check;
- any material decision that must return to a person.

The work now carries more of its own operating memory. The person does not have to reconstruct the goal and boundaries at every handoff.

## Choose only the relevant module

Dwi is modular by design.

- Use **Conduct** when communication or a blocking question is difficult.
- Use **Lean** when work is expanding beyond the requested outcome.
- Use **Budget** when resources or checkpoints need an honest boundary.
- Use **Bridge** when advice or execution crosses native harnesses.
- Use **Arc** when several genuinely separate work cells need ownership and integration.
- Use **Evidence** when material claims need status, provenance, and visible unknowns.
- Use **All-in-One** only when several observed pressures recur together. It selects the relevant lenses rather than forcing all six onto every task.

The smallest useful module is usually the best starting point.

## Use strong reasoning where it changes the decision

One valid Arc pattern is to use a capable model for planning, decomposition, integration, and judgment, while lower-cost models perform clear and bounded steps.

This pattern is optional. Arc does not require a particular provider, model family, or price tier.

The rule is simpler:

> Spend stronger reasoning on decisions, not on repetition.

## Parallel work needs real independence

Work can move in parallel only when the lanes do not depend on the same mutable files or the same unresolved decision.

Each lane needs:

- a bounded question or write scope;
- one writer for mutable content;
- an acceptance condition;
- an evidence return;
- a clear integration point.

Root owns the user outcome and decides what enters the shared result.

Parallel execution can reduce elapsed time when the lanes are genuinely independent. It is not an automatic speedup and should not be described as exponential.

## The work does not approve itself

Dwi separates a fluent result from proof.

A useful evidence route is:

```text
Claim
→ Artifact
→ Validation
→ Independent inspection
→ Human decision
```

Every lane returns evidence. Root checks how the pieces fit. An independent gate can challenge the result without sharing the writer's assumptions. The authorized person decides what is accepted.

Evidence types remain distinct:

- static evidence inspects files, structure, configuration, or syntax;
- runtime evidence observes the relevant system while it runs;
- human evidence records a decision or judgment only the authorized person can supply.

One category does not silently replace another.

## Stop at a meaningful boundary

The operating loop is:

```text
Work
→ Checkpoint
→ Evidence
→ Human review
→ Continue, narrow, or exit
```

Stopping at the boundary is correct behavior when:

- authority is missing;
- the next effect is irreversible or external;
- evidence is insufficient for the claim;
- ownership overlaps;
- the requested finish line is already complete;
- the next unit of work has no demonstrated value.

## A small example

```text
Intent:
Update one installation paragraph so the scope is clear.

Context:
Use the current English and Vietnamese installation guides.

Authority:
Edit only those two documentation files. Do not modify modules, tags, or releases.

Evidence:
Show the exact diff, verify internal links, and state any remaining uncertainty.

Writer:
One documentation writer.

Finish line:
Both language versions express the same operational meaning.
```

This packet is small enough to act on directly. It does not need an Arc, a broad test campaign, or a new coordination system.

## Continue reading

- [Architecture](architecture.md)
- [Operating principles](principles.md)
- [Evidence policy](evidence.md)
- [Safety model](safety.md)
- [Installation guide](installation.md)
