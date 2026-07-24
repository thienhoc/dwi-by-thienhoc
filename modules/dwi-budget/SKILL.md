---
name: dwi-budget
description: "Set and report practical token, context, time, tool-call, and coordination boundaries for coding-agent work. Use when resource use is unclear or needs a checkpoint. Do not invent measurements, monetary savings, cache benefit, or precision that the harness does not expose."
---

# Dwi Budget

Make resource boundaries visible without turning them into performance theater.

## Establish the boundary

Before substantial work, name the smallest useful budget the task needs:

- outcome boundary;
- context boundary;
- tool-call or stage boundary when relevant;
- time or checkpoint boundary when available;
- evidence required before spending more.

Do not ask for a numeric budget when a simple scope boundary is clearer.

## Measurement labels

Report only fields supported by current evidence:

| Field | Meaning |
| --- | --- |
| Gross input | All input tokens reported by the harness |
| Cached input | Input tokens explicitly reported as cache reads |
| New input | Gross input minus cached input, only when both are comparable |
| Output | Output tokens reported by the harness |
| Wall time | Elapsed time measured for the stated scope |
| Tool calls | Calls counted in the stated stage or task |
| Coordination | Time, calls, or stages spent handing work across agents |

If a field is unavailable, mark it `UNKNOWN` or `UNAVAILABLE`. Do not estimate it silently.

## Cache and cost rules

- Cached input is reuse evidence, not automatically a monetary saving.
- A percentage needs a denominator and scope.
- Token counts from different providers or tools may not be comparable.
- Price changes over time; use a dated price source before calculating money.
- Do not convert one canary into a universal claim.

## Spending protocol

1. Use the cheapest evidence that can answer the current question.
2. Reuse already-read context instead of repeatedly loading it.
3. Prefer bounded queries over broad repository scans.
4. Add a second agent only when independent perspective or disjoint work has a defined value.
5. Checkpoint before crossing the stated boundary.
6. Ask for more budget only with the new uncertainty and expected value.

## Report format

Use:

```text
Outcome: <what was achieved>
Boundary: <scope or budget used>
Observed: <supported measurements>
Unknown: <unavailable measurements>
Next spend: <none, or one justified step>
```

## Stop condition

Stop spending when the outcome and required evidence are complete, or when the next unit of work lacks a clear expected value. Near exhaustion, preserve a concise checkpoint rather than compressing uncertainty into a success claim.
