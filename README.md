# @plasius/player-system-interface

[![npm version](https://img.shields.io/npm/v/@plasius/player-system-interface.svg)](https://www.npmjs.com/package/@plasius/player-system-interface)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/player-system-interface/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/player-system-interface/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/player-system-interface)](https://codecov.io/gh/Plasius-LTD/player-system-interface)
[![License](https://img.shields.io/github/license/Plasius-LTD/player-system-interface)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

World-space Player System overlays, focus panes, and target-surface contracts for Plasius game experiences.

Apache-2.0. ESM + CJS builds. TypeScript types included.

## Installation

```bash
npm install @plasius/player-system-interface
```

## Scope

`@plasius/player-system-interface` owns the reusable interface boundary for:

- focus panes and combat-safe reductions
- world-space overlay panel definitions
- target popup anchors and alert markers
- self-state and line-of-sight identity projection overlays
- overlay accessibility contracts for keyboard, focus restoration, and announcements
- frame-budget assumptions for diegetic panel updates
- Party/System composition metadata
- portable host-adapter seams and multi-overlay scale expectations

It does not own gameplay orchestration or world authority.

## Demo

```bash
npm run build
node demo/example.mjs
```

## Usage

```ts
import {
  createFocusPaneShellDefinition,
  createInterfaceShellDefinition,
  createInterfaceShellSurfaceDefinition,
  createLineOfSightTargetPopupDefinition,
  createPlayerSystemInterfaceContract,
  createPlayerSystemInterfacePortabilityContract,
  packageDescriptor,
} from "@plasius/player-system-interface";

const shell = createInterfaceShellDefinition({
  surfaces: [
    createInterfaceShellSurfaceDefinition({
      surfaceId: "mission-focus-surface",
      owner: "player-system",
      kind: "focus-pane",
      anchorId: "focus-pane-anchor",
      interactive: true,
      priority: 10,
      combatBehavior: "reduce",
    }),
  ],
  focusPane: createFocusPaneShellDefinition({
    panelId: "mission-focus",
    owner: "player-system",
    pane: "missions",
    anchorId: "focus-pane-anchor",
    heading: "Mission focus",
    interactive: true,
    combatBehavior: "reduce",
  }),
  targetPopups: [
    createLineOfSightTargetPopupDefinition({
      popupId: "nearby-threat",
      owner: "player-system",
      anchorId: "target-anchor",
      targetId: "forest-wolf",
      summary: "Hostile target in range",
      requiresLineOfSight: true,
    }),
  ],
});

console.log(packageDescriptor.packageName, shell.focusPane?.pane);
console.log(createPlayerSystemInterfaceContract().frameBudget.maxFrameMs);
console.log(
  createPlayerSystemInterfacePortabilityContract().hostAdapters.supportedHosts
);
```

## Interface NFR Contract

The inherited feature flag for this work is `harmony.player-system.interface.enabled`.

`defaultPlayerSystemInterfaceContract` and `createPlayerSystemInterfaceContract()` make these host expectations explicit:

- sequential or direct-hotkey keyboard access for overlay activation
- focus restoration to the trigger, pane heading, or nearest anchor
- live-region behavior for assistive announcements
- per-frame interaction budgets for world-space panels
- partial nested overrides for accessibility and frame-budget values

## Interface Portability Contract

The inherited feature flag for this work is `harmony.player-system.interface.enabled`.

`defaultPlayerSystemInterfacePortabilityContract`,
`createPlayerSystemInterfacePortabilityContract()`, and
`assessPlayerSystemInterfaceComposition()` make these expectations explicit:

- supported overlay hosts stay portable across DOM, native, and snapshot harnesses
- required adapter capabilities are documented instead of assumed implicitly
- multi-pane and multi-overlay compositions stay within bounded panel, alert, and focus budgets

## Interface Shell Contracts

`createInterfaceShellDefinition()`, `createFocusPaneShellDefinition()`,
`createLineOfSightTargetPopupDefinition()`, and
`assessInterfaceShellDefinition()` cover the reusable shell surface for Story
`#417`:

- focused panes and line-of-sight target popups are first-class contracts
- Party and Player System surfaces can coexist in one shell definition
- reduced-combat behavior is explicit per surface and bounded by the shell policy

## Identity Status Overlays

`createIdentityStatusOverlayDefinition()` represents the Identity System's
self-state and explicit external target projections. The inherited feature
flag is `harmony.player-system.identity.enabled`.

- Self-state overlays use the `self-state` invocation and never require line of
  sight.
- External overlays require an explicit `identity-sweep` or `spell-targeting`
  invocation and line of sight.
- `allied`, `neutral`, `unknown`, and `unfriendly` are operational targeting
  categories, not absolute moral truth labels.
- `readableFacts` must be a subset of `perceivableFacts`; use `partial`,
  `fuzzy`, or `withheld` confidence when identity truth is incomplete.
- Add identity overlays to a shell with an `identity-overlay` surface and use
  `assessIdentityStatusOverlayDefinition()` / `assessInterfaceShellDefinition()`
  before rendering.

## Project Harmony namespace migration

The Project Harmony cutover is a breaking public-contract change. Consumers
moving to the next major release must replace these rollout values before
enabling `harmony.namespace-cutover.enabled`:

| Previous key | Harmony key |
| --- | --- |
| `isekai.player-system.interface.enabled` | `harmony.player-system.interface.enabled` |
| `isekai.player-system.identity.enabled` | `harmony.player-system.identity.enabled` |
| `isekai.player-system.packages.enabled` | `harmony.player-system.packages.enabled` |
| `isekai.player-system.runtime-nfr.enabled` | `harmony.player-system.runtime-nfr.enabled` |
| `isekai.player-system.runtime-portability.enabled` | `harmony.player-system.runtime-portability.enabled` |

The package publishes only Harmony values. It provides no aliases, dual-read
parsing, environment fallback, or runtime translation for the previous product
namespace. Caller-supplied interface overrides must also use `harmony.*` keys.

## Shell State, 3D Panes, and Ambient Alerts

`createInterfaceShellState()` represents ambient, focused, and combat-safe
visibility without coupling the package to a renderer. Combat-safe state keeps
only retained surface kinds and never exposes suspended surfaces. Use
`applyInterfaceShellFocusShift()` for keyboard, direct-hotkey, restore, or
system focus changes; shifts to hidden surfaces are rejected.

`createThreeDPaneHostDefinition()` associates a pane with a shell surface,
world anchor, and supported host adapters. It describes the host boundary but
does not own rendering or scene orchestration.

`createLocalizedAmbientAlertDefinition()` stores an allowlisted locale-to-copy
map with an explicit live-region mode. Resolve the best available copy with
`resolveLocalizedAmbientAlertMessage()` and validate pane/alert composition with
`assessInterfaceShellDefinition()`.

## Governance

- ADRs: [docs/adrs](./docs/adrs)
- TDRs: [docs/tdrs](./docs/tdrs)
- Design notes: [docs/design](./docs/design)
- Parent feature flag: `harmony.player-system.interface.enabled`
- Capability: not required for package bootstrap; interface adoption remains feature-flag led
- Rollback: disable `harmony.player-system.interface.enabled` to halt package-family adoption without changing package code
- Identity rollback: disable `harmony.player-system.identity.enabled` to stop identity projection adoption without changing package code
- Namespace rollback: disable `harmony.namespace-cutover.enabled`, restore the previous coordinated package majors, and complete the approved reverse stored-value migration before re-enabling consumers

<!-- BEGIN PLASIUS RELEASE INTEGRITY -->
## Release integrity

CI keeps the administrative contributor registry outside Git and npm package
artifacts using exact, case-normalised path checks. CI runs on approved
self-hosted runners for same-repository pull requests and `main`; fork PR code
is denied. Publication uses the GitHub-hosted `production` job with Node 24 and
npm 11.5.1 or newer. It is token-free and proceeds only while the prepared SHA
is the exact `main` head after successful push-triggered CI. Do not dispatch CD
until the npm trusted-publisher binding is verified.
<!-- END PLASIUS RELEASE INTEGRITY -->
