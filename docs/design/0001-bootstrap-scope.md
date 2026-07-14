# Player System Interface Bootstrap

## Goal

Provide a package-standard bootstrap for the Player System interface boundary.

## Initial Surface

- package descriptor and feature-flag metadata
- interface mode and pane contracts
- world-space panel helper
- overlay portability contract and composition assessment helper
- demo and test scaffolding

## Shell Extension

The shell boundary also represents ambient, focused, and combat-safe state,
safe focus transitions, renderer-agnostic 3D pane hosts, and localized ambient
alert catalogs. These remain contracts and validation helpers; rendering,
scene orchestration, localization service ownership, and gameplay authority
remain outside this package.

## Exclusions

- gameplay orchestration
- institutional authority
- host-app specific rendering code

## Portability Notes

- Overlay consumers should bind through explicit host-adapter capabilities.
- Multi-pane and multi-overlay compositions stay within documented focus,
  panel, and alert budgets.
- The package must not assume one renderer, one pane, or one scene topology.
