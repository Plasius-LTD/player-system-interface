# ADR-0001: Player System Interface Package Boundary

## Status

Accepted

## Context

The Player System needs a reusable interface package for world-space panels, focus panes, and target overlays that can be consumed by host runtimes and demos.

## Decision

`@plasius/player-system-interface` will own interface-facing contracts and helpers for Player System overlays while leaving runtime orchestration to `@plasius/player-system`.

## Consequences

- Host runtimes can share a stable overlay contract.
- Rendering-specific integrations can stay outside gameplay orchestration.
- Party/System composition work has an explicit interface boundary.
