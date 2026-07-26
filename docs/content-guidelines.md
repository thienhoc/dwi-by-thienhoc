# Content and publication guidelines

These guidelines protect Dwi's meaning across repository documentation, website copy, release notes, examples, and contributor changes.

The goal is not to make every page sound identical. The goal is to preserve the same product truth while adapting depth and examples to the reader.

## Begin with the person

Preferred sequence:

```text
Human situation
→ Hidden burden
→ What changes
→ Dwi mechanism
→ Proof or limitation
→ Next step
```

Make the human problem visible before introducing Dwi.

Avoid copy that begins as a feature inventory:

```text
Dwi does this.
Dwi also does that.
Dwi has another feature.
```

## Voice

The complete voice combines:

1. concise product writing;
2. humble human explanation;
3. evidence-aware technical precision.

Use a calm, direct, humane, precise, and modest tone.

Use concrete verbs such as:

```text
inspect
choose
limit
verify
observe
remove
stop
```

Avoid inflated language such as:

```text
revolutionary
autonomous
seamless
magic
guaranteed
universal
eliminates chaos
never collides
works with everything
```

## Writing rules

- Use one idea per headline.
- Keep body paragraphs short.
- Do not repeat the same reasoning in different words.
- Use common language when it is sufficient.
- Explain the plain idea before the technical term.
- Define jargon at first use or link to the glossary.
- Do not use the em dash character.
- Do not repeat the same sentence pattern across several sections.
- Do not make beginners feel inferior.
- Do not make professional readers accept vague claims.
- Do not present personal experience as universal proof.
- Preserve English and Vietnamese operational meaning together.

## Product terminology

Use this hierarchy:

- **Category:** The Human Layer for AI Agents.
- **Product form:** a modular human layer.
- **Plain-language function:** an operating layer that keeps intent, scope, authority, ownership, resources, and evidence visible.
- **Technical package:** Agent Skills when explaining compatible discovery or installation paths.

Do not position Dwi as:

- another model;
- a hidden runtime;
- a permission system;
- a mandatory all-in-one framework;
- a universal compatibility layer.

## Module wording

Focused modules remain the primary product units.

All-in-One must be described as:

> An optional composition module that selects only the relevant Dwi lenses when several observed pressures recur together.

Do not say that All-in-One always applies all six lenses. Do not call it a seventh architectural layer.

Arc must remain model-agnostic. A strong Root with lower-cost execution cells may be described only as an optional deployment pattern.

## Evidence and claim guardrails

- Label personal usage volume as author-reported.
- Do not present personal usage volume as independent proof.
- Do not promise universal token savings.
- Do not promise universal speed gains.
- Do not describe parallel execution as exponential speedup.
- Do not equate cached input automatically with money saved.
- Keep observed cases within their stated scope and limitations.
- Treat fluent or polished output as a claim, not proof.
- Keep static, runtime, and human evidence distinct.
- Preserve failed checks, exclusions, and unknowns.
- Keep human authority as the final decision point.

Every public number needs:

- a stable source identifier;
- a denominator;
- a method;
- an environment and scope;
- exclusions;
- a plain-language limitation.

When those fields are not available, remove the number or label it `ESTIMATED` with its method and uncertainty.

## Compatibility wording

Prefer:

> Bounded compatibility observations are documented for Codex and Claude Code.

Avoid:

> Works with Codex and Claude Code.

> Tested with Codex and Claude Code.

unless the exact statement is linked to evidence that supports the stated scope, harness version, environment, module, method, and date.

## Speed and efficiency wording

Prefer:

> Parallel work can reduce elapsed time when lanes are genuinely independent.

> A capable model can focus on planning and judgment while bounded execution steps use other models.

Avoid:

> Dwi makes work exponentially faster.

> Dwi automatically saves tokens and money.

Efficiency claims must name the baseline, numerator, denominator, environment, and uncertainty.

## Case-study structure

A useful case should include:

```text
Human situation
What usually goes wrong
Why it becomes mentally heavy
What Dwi changes
What Dwi does not solve
Example workflow
Evidence to request
Safe next step
Related modules
Related reading
```

Recommended metadata:

```yaml
title:
description:
audience:
reading_time:
primary_module:
supporting_modules:
evidence_status:
last_reviewed:
```

Do not publish an empty case shell. Add a case only when its human situation, limitation, evidence request, and safe next step are complete.

## English and Vietnamese parity

Meaning parity is more important than sentence-by-sentence literal translation.

For user-facing changes, verify that both languages preserve:

- the same authority boundary;
- the same safety limitation;
- the same release status;
- the same evidence scope;
- the same module behavior;
- the same next action.

Do not introduce a stronger claim in one language.

## Review checklist

Before merging public copy, confirm:

- the person and hidden burden appear before the mechanism;
- the module description matches the current `SKILL.md`;
- compatibility and performance claims are scoped;
- numbers have evidence or are removed;
- All-in-One is relevance-gated;
- parallel execution is conditional on independence;
- the final decision remains human;
- English and Vietnamese meanings match;
- internal links point to the current source of truth;
- no release or status claim is ahead of the actual repository state.

## Related documents

- [Brand system](brand.md)
- [Evidence policy](evidence.md)
- [Safety model](safety.md)
- [Operating principles](principles.md)
- [Contributing](../CONTRIBUTING.md)
