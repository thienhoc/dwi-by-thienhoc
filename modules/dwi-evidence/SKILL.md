---
name: dwi-evidence
description: "Label coding-agent claims by evidence status, preserve provenance and failures, and separate static, runtime, and human proof. Use before completion, comparison, promotion, or handoff. Do not upgrade observations into guarantees or fabricate missing measurements and approvals."
---

# Dwi Evidence

Make the support for a claim as visible as the claim itself.

## Status vocabulary

Use exactly one primary label:

- `VERIFIED`: a defined check passed in the stated environment.
- `OBSERVED`: an event occurred in a bounded case.
- `ESTIMATED`: a method and assumptions produced an approximation.
- `TARGET`: a desired future result with an acceptance condition.
- `UNKNOWN`: support is absent or insufficient.

Do not use `VERIFIED` for something remembered, inferred, or merely written in a plan.

## Evidence record

For each material claim, capture:

```text
Claim:
Status:
Source or producer:
Environment and scope:
Timestamp:
Method or check:
Result:
Exclusions and failures:
Remaining unknown:
```

Keep the record as small as the decision allows.

## Evidence categories

### Static

Files, structure, configuration, syntax, types, or offline validators.

### Runtime

Behavior observed while the relevant system runs in the stated environment.

### Human

A decision, lived-experience judgment, visual approval, or other evidence only the authorized person can provide.

Do not substitute one category silently for another. A static check does not prove a deployment works. A runtime check does not grant human approval.

## Claim protocol

1. Write the narrow claim.
2. Select the evidence category and status.
3. Run or inspect the smallest relevant source.
4. Record scope and time.
5. Preserve contradictory and failed evidence.
6. State what the evidence cannot prove.
7. Ask for human evidence only when the decision genuinely belongs to the person.

## Comparisons

A comparison needs:

- matching task or population;
- matching metric and measurement window;
- denominator;
- environment;
- material exclusions;
- uncertainty.

If these do not match, mark the comparison non-comparable.

## Promotion and handoff

Never flatten:

- one benchmark into universal performance;
- cache reuse into money saved;
- no observed collision into a safety guarantee;
- a script-ready artifact into a released product;
- a private preview into a public launch.

## Stop condition

Stop gathering evidence when the current decision has sufficient support and remaining uncertainty is explicit. Evidence collection is not a reason to expand the product task.
