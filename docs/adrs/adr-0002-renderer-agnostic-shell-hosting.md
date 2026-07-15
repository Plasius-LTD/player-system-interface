# ADR-0002: Renderer-Agnostic Interface Shell Hosting

## Status

Accepted

## Context

The Player System interface package already describes focus panes, world-space
surfaces, and host adapter capabilities. Consumers also need a stable way to
represent ambient versus focused shell state, reduce surfaces during combat,
host 3D panes, and announce localized ambient alerts. Embedding these concerns
in a DOM or scene renderer would couple the package to one runtime and make
keyboard, native, and snapshot hosts diverge.

## Decision

Add immutable contracts and validation helpers for:

- ambient, focused, and combat-safe shell state;
- focus shifts that can only target visible surfaces;
- 3D pane hosts associated with an existing shell surface and anchor;
- localized ambient alert messages with explicit live-region behavior.

Combat-safe visibility is derived from the shell's retained surface kinds and
each surface's `persist`, `reduce`, or `suspend` behavior. Pane hosts describe
supported adapters but do not render panes. Alert definitions hold a bounded
locale-to-copy map and do not call a translation service. The existing
`harmony.player-system.interface.enabled` feature flag remains the rollout
control; no capability is added because this package provides reusable
contracts rather than entitlement or navigation.

## Alternatives considered

- Put state and pane hosting in `@plasius/player-system`: rejected because it
  would make reusable interface contracts depend on gameplay orchestration.
- Add React or DOM components here: rejected because native and headless
  hosts are first-class consumers.
- Resolve translations through a runtime service: rejected because the package
  must remain deterministic, portable, and dependency-light.

## Impact

Consumers can share shell state and accessibility-aware alert contracts across
renderer adapters. Invalid focus targets, orphaned pane hosts, and empty alert
catalogs are detected by deterministic helpers before a host attempts to
render them.

## Test and release implications

Tests cover state transitions, focus-shift rejection, combat-safe filtering,
pane-host composition, alert fallback resolution, and invalid definitions.
The package continues to use its existing CI, dual-module build, and public
package validation gates; no dependency or publication workflow changes are
required.
