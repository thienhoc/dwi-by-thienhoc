# Evidence policy

Dwi treats confidence as structured data, not tone.

## Claim labels

| Label | Meaning | Minimum support |
| --- | --- | --- |
| `VERIFIED` | A defined check passed in the stated environment | Command, validator, artifact, or human approval with scope and time |
| `OBSERVED` | Something happened in a bounded case | Case description, source, scope, and timestamp |
| `ESTIMATED` | A reasoned approximation | Method, assumptions, and uncertainty |
| `TARGET` | A desired future result | Owner and acceptance condition |
| `UNKNOWN` | Evidence is absent or insufficient | The missing check or decision |

## Evidence record

A useful record answers:

1. What exactly is being claimed?
2. Who or what produced the evidence?
3. In which environment and scope?
4. When was it observed?
5. What method or check was used?
6. What failed, was excluded, or remains unknown?

## Static, runtime, and human evidence

- Static evidence inspects files, structure, configuration, or syntax.
- Runtime evidence observes behavior while the relevant system runs.
- Human evidence records a decision, review, or lived-experience judgment only the person can supply.

One category does not silently substitute for another.

## Research observations before release

Candidate research observations remain private release evidence until their source artifacts are approved for publication. Do not list their numbers in public discovery copy. Before any observation appears in promotion, the release must include a stable source identifier, denominator, method, environment, exclusions, and plain-language caveat.

## Failure preservation

A failed attempt is evidence about that attempt. Keep the failure class and scope. Do not promote transport errors into product findings, and do not discard inconvenient results to make a narrative cleaner.
