# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Changed
- Refresh compatible npm dependencies from the registry for the weekly dependency maintenance wave.


- **Added**
  - (placeholder)

- **Changed**
  - Bound npm publication to the exact prepared `main` commit after successful push-triggered CI.
  - (placeholder)

- **Fixed**
  - Added exact-commit CI dispatch and disabled package-manager cache finalization in both hosted validation jobs.
  - (placeholder)

- **Security**
  - Removed the npm write-token path, added a fail-closed npm 11.5.1-or-newer OIDC guard, and denied fork PR code access to reviewed CI.
  - Pinned patched transitive npm dependencies to clear the current audit baseline.
  - Moved reviewed CI to explicit GitHub-hosted runners while retaining the same-repository pull-request guard.
  - Added fail-closed source and npm-package admission for the administrative contributor registry and pinned the CI/CD runtime to Node.js 24.18.0 LTS.
  - Pinned patched transitive build-tool dependencies for the current npm audit advisories.
  - (placeholder)

## [1.0.0] - 2026-07-15

- **Added**
  - (placeholder)

- **Changed**
  - **Breaking:** replaced exported Player System interface and identity rollout values, plus active package-family documentation, from `isekai.*` to `harmony.*`. The next release is a major version and intentionally provides no aliases, dual-read parsing, or legacy runtime fallback.

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.6] - 2026-07-14

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.5] - 2026-07-14

- **Added**
  - add ambient, focused, and combat-safe shell state contracts with safe focus shifts
  - add renderer-agnostic 3D pane host definitions and localized ambient alert catalogs
  - add self-state and line-of-sight identity projection contracts with bounded readable facts

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.4] - 2026-06-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.3] - 2026-06-22
- bootstrap `@plasius/player-system-interface` from the schema package baseline with package governance, docs, tests, and demo scaffolding
- add overlay accessibility and frame-budget contracts under `isekai.player-system.runtime-nfr.enabled`
- align bootstrap rollout documentation and exports on parent feature flag `isekai.player-system.packages.enabled`
- accept partial nested interface-contract overrides from TypeScript consumers
- add portable host-adapter and multi-overlay composition contracts under `isekai.player-system.runtime-portability.enabled`
- align all exported interface contracts to the inherited `isekai.player-system.interface.enabled` story flag
- add reusable shell contracts for focus panes, line-of-sight target popups, shared Party/System surfaces, and reduced-combat policies


[0.1.3]: https://github.com/Plasius-LTD/player-system-interface/releases/tag/v0.1.3
[0.1.4]: https://github.com/Plasius-LTD/player-system-interface/releases/tag/v0.1.4
[0.1.5]: https://github.com/Plasius-LTD/player-system-interface/releases/tag/v0.1.5
[0.1.6]: https://github.com/Plasius-LTD/player-system-interface/releases/tag/v0.1.6
[1.0.0]: https://github.com/Plasius-LTD/player-system-interface/releases/tag/v1.0.0
