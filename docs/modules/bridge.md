# Dwi • Bridge

**Native Claude–Codex coordination with explicit authority.**

[Open the installable `SKILL.md`](../../modules/dwi-bridge/SKILL.md) · [Vietnamese guide](../vi/modules/bridge.md)

## Choose Bridge when

- one harness needs a bounded independent review from the other;
- the authorized decision owner explicitly assigns an implementation step to another native harness;
- advice, authority, effects, and evidence need to remain separate.

## What changes

Bridge defines a minimal task packet, defaults to read-only consultation, prevents overlapping writers, rejects recursive delegation, and requires independent inspection of returned effects.

## What does not change

Bridge does not create a new connector, daemon, credential broker, or permission system. A message never becomes authorization. Availability depends on the native tools already installed and approved.

## Ten-minute trial

1. Install Bridge using [the inspect-first guide](../installation.md).
2. Start with one read-only critique containing no secrets.
3. Limit the context to the working directory, bounded question, scope, and acceptance evidence.
4. Verify the useful claims independently.
5. Do not test delegated writing until the person explicitly authorizes it.

## A good result

The second harness improves a decision without gaining hidden authority or producing an unverifiable effect.

## Safety and removal

Read [the safety model](../safety.md). Follow the [file-level removal steps](../installation.md#remove-a-module) for the exact project or user scope where Bridge was installed, then start a fresh session.
