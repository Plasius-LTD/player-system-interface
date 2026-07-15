# TDR-0001: Player System Interface Bootstrap Scope

## Summary

Bootstrap the interface package with dual-module outputs, baseline CI, overlay
contracts, docs, demo, tests, and the inherited feature flag
`harmony.player-system.packages.enabled`.

Feature `harmony.player-system.runtime-portability.enabled` extends that scope
with explicit host-adapter and composition-scale contracts for overlay
consumers.

## Direction

The bootstrap should stop at interface contracts and helpers. Full rendering integration is a later implementation concern.

The bootstrap must not introduce a separate interface-specific feature flag
unless a later tracked feature explicitly documents the extra gate.

Shell state, 3D pane hosting, and localized ambient alerts extend the same
renderer-agnostic boundary. State transitions are represented as immutable
contracts, focus shifts are rejected when their target is not visible, and
combat-safe visibility is derived from the shell's retained-surface policy.

Portable host expectations should remain renderer-agnostic and avoid assuming a
single DOM tree, scene graph layout, or pane topology.
