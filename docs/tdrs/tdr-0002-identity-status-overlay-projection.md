# TDR 0002: Identity Status Overlay Projection

## Purpose

Define the package-level contract for the Identity System's self-state and
target-projection surfaces.

## Contract rules

1. Self-state uses `targetKind: "self"`, `relation: "self"`, and
   `invocation: "self-state"`.
2. External projections use `targetKind: "external"`, require a target id and
   line of sight, and are invoked by `identity-sweep` or `spell-targeting`.
3. Relation labels are operational targeting categories: `allied`, `neutral`,
   `unknown`, and `unfriendly`.
4. `readableFacts` cannot contain facts outside `perceivableFacts`.
5. Incomplete knowledge is represented with `partial`, `fuzzy`, or `withheld`
   confidence rather than fabricated certainty.
6. Combat consumers should use `condensed` presentation for immediate target
   choice and threat recognition.

The package intentionally models requirements and validation seams; the
authoritative state plane supplies the actual facts and the host supplies the
rendering.
