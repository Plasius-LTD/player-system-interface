# ADR 0003: Identity Projection Contract Boundary

- Status: Accepted
- Date: 2026-07-14
- Feature flag: `harmony.player-system.identity.enabled`

## Context

The Player System needs a reusable surface for self-state and externally
inspected entities. The Identity System design requires explicit invocation,
line-of-sight constraints, operational ally/enemy categories, and partial
reads when the player cannot legitimately perceive all identity truth.

## Decision

Add discriminated identity overlay contracts to
`@plasius/player-system-interface`:

- self-state overlays are always invocable through the System and do not
  require line of sight;
- external target projections require an identity sweep or spell-targeting
  invocation and line of sight;
- relations distinguish `allied`, `neutral`, `unknown`, and `unfriendly`;
- readable facts must be a subset of perceivable facts, with explicit complete,
  partial, fuzzy, or withheld confidence;
- shell assessment requires each identity overlay to be backed by an
  `identity-overlay` surface.

The package describes the projection boundary only. It does not become a new
source of identity truth or implement rendering, perception, or authorization.

## Alternatives considered

- Permanent target nameplates: rejected because they expose too much truth and
  create unbounded visual noise.
- A generic untyped metadata map: rejected because consumers could accidentally
  render facts that were not perceived.
- A package-side identity authority: rejected because world and Identify
  systems remain authoritative.

## Impact and rollback

The public API gains immutable identity overlay types, factories, and
assessment functions. Consumers can roll back adoption by disabling
`harmony.player-system.identity.enabled`; no package code change is required.
