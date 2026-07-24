# Dwi • Budget

**Visible resource boundaries without invented savings.**

[Open the installable `SKILL.md`](../../modules/dwi-budget/SKILL.md) · [Vietnamese guide](../vi/modules/budget.md)

## Choose Budget when

- token or context use is difficult to interpret;
- a long task needs a checkpoint before more work;
- cache use is being confused with money saved;
- coordination overhead needs to be visible.

## What changes

Budget sets an outcome or resource boundary and reports only measurements the harness exposes. It separates gross input, cached input, new input, output, wall time, tool calls, and coordination when those values are actually available.

## What does not change

Budget does not invent provider telemetry, prices, cache ratios, monetary savings, or cross-provider comparisons. It does not force a numeric limit when a scope boundary is clearer.

## Ten-minute trial

1. Install Budget using [the inspect-first guide](../installation.md).
2. Pick a bounded research or coding task.
3. Set one checkpoint and ask for observed versus unavailable measurements.
4. Check that every percentage has a denominator and scope.
5. Remove the module if reporting costs more attention than it returns.

## A good result

You can see what the harness reported as used, what remains unknown, and whether another unit of work has a clear expected value.

## Safety and removal

Read [the safety model](../safety.md). Follow the [file-level removal steps](../installation.md#remove-a-module) for the exact project or user scope where Budget was installed, then start a fresh session.
