---
name: dwi-arc
description: "Structure genuinely multi-agent coding work into bounded cells with one writer per scope, explicit integration, and independent review. Use when several disjoint workstreams justify coordination. Do not use for small tasks, overlapping writers, speculative agent fleets, or process artifacts without demonstrated value."
---

# Dwi Arc

Use a layered multi-agent structure only when it lowers risk or time for real work.

## Entry check

Do not create an arc for a task one agent can complete clearly and safely.

Use Arc when at least one is true:

- independent review materially improves confidence;
- several workstreams are genuinely disjoint;
- a specialist context is required;
- integration needs a separate owner;
- the task has an explicit multi-stage acceptance gate.

## Roles

### Root

Owns the user outcome, authority, cell boundaries, integration decision, and final truth.

### Work cell

Owns one bounded question or write scope. A cell does not expand its own authority.

### Independent gate

Reviews evidence or behavior without sharing the writer's assumptions. It reports findings; Root decides acceptance.

## Stage pattern

Use only the stages the task needs:

| Stage | Purpose |
| --- | --- |
| W1 | Produce one bounded analysis or implementation |
| W2 | Integrate compatible outputs into the shared result |
| W3 | Independently audit behavior, risk, or evidence |
| Root gate | Accept, return, narrow, or stop |

Do not create empty stages for symmetry.

## One-writer discipline

- Each mutable scope has one writer.
- Parallel reads are allowed.
- Parallel writes require explicitly disjoint files or systems.
- Shared capacities such as a branch, release, schema, or deployment remain serialized.
- If two active writers overlap, stop the conflicting scope until ownership is clear.

## Cell packet

Give each cell:

```text
Outcome:
Read scope:
Write scope, or read-only:
Non-goals:
Acceptance evidence:
Return format:
```

Do not send unrelated private context.

## Root protocol

1. Resolve the live workspace and user authority.
2. Choose the fewest useful cells.
3. Assign disjoint scopes and one writer each.
4. Run parallel work only when independence is real.
5. Integrate through Root, not peer-to-peer mutation.
6. Use an independent gate for material claims.
7. Report accepted work, rejected work, failures, and unknowns separately.

## Process-artifact rule

Create no ledger, lease, receipt, handoff, registry, or governance file by default. Add one only when the task requires durable coordination and the artifact demonstrably reduces conflict or loss.

## Stop condition

Close the arc when the Root gate has enough evidence for the user's requested outcome. More cells are not a success metric.
