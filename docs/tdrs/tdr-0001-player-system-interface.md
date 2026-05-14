# TDR-0001: Player System Interface Bootstrap Scope

## Summary

Bootstrap the interface package with dual-module outputs, baseline CI, overlay
contracts, docs, demo, tests, and the inherited feature flag
`isekai.player-system.packages.enabled`.

## Direction

The bootstrap should stop at interface contracts and helpers. Full rendering integration is a later implementation concern.

The bootstrap must not introduce a separate interface-specific feature flag
unless a later tracked feature explicitly documents the extra gate.
