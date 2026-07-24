# Dwi • Arc

**Bounded multi-agent cells with one writer per scope.**

[Open the installable `SKILL.md`](../../modules/dwi-arc/SKILL.md) · [Vietnamese guide](../vi/modules/arc.md)

## Choose Arc when

- independent review could materially change acceptance;
- several workstreams are truly disjoint;
- a specialist context is required;
- integration needs a separate owner and gate.

## What changes

Arc gives the Root agent the user outcome and integration authority. Work cells receive bounded read or write scopes. Optional W1, W2, and W3 stages represent production, integration, and independent audit; empty stages are omitted.

## What does not change

Arc does not make a small task multi-agent by default. It does not allow overlapping writers, speculative fleets, recursive delegation, or process ledgers without demonstrated need.

## Ten-minute trial

1. Install Arc using [the inspect-first guide](../installation.md).
2. Choose a task with two read-only questions that can be answered independently.
3. Let Root assign one bounded question to each cell.
4. Have Root synthesize the result and show rejected or uncertain findings.
5. Add a writer only in a later trial with an explicit disjoint scope.

## A good result

Parallelism reduces decision time or improves evidence without making ownership harder to understand.

## Safety and removal

Read [the safety model](../safety.md). Follow the [file-level removal steps](../installation.md#remove-a-module) for the exact project or user scope where Arc was installed, then start a fresh session.
