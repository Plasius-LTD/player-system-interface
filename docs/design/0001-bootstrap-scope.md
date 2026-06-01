# Player System Interface Bootstrap

## Goal

Provide a package-standard bootstrap for the Player System interface boundary.

## Initial Surface

- package descriptor and feature-flag metadata
- interface mode and pane contracts
- world-space panel helper
- overlay portability contract and composition assessment helper
- demo and test scaffolding

## Exclusions

- gameplay orchestration
- institutional authority
- host-app specific rendering code

## Portability Notes

- Overlay consumers should bind through explicit host-adapter capabilities.
- Multi-pane and multi-overlay compositions stay within documented focus,
  panel, and alert budgets.
- The package must not assume one renderer, one pane, or one scene topology.
