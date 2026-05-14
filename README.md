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
- Party/System composition metadata

It does not own gameplay orchestration or world authority.

## Demo

```bash
npm run build
node demo/example.mjs
```

## Usage

```ts
import {
  createWorldSpacePanelDefinition,
  packageDescriptor,
} from "@plasius/player-system-interface";

const panel = createWorldSpacePanelDefinition({
  panelId: "mcc-focus",
  pane: "mcc",
  anchorId: "player-core",
  interactive: true,
});

console.log(packageDescriptor.packageName, panel.pane);
```

## Governance

- ADRs: [docs/adrs](./docs/adrs)
- TDRs: [docs/tdrs](./docs/tdrs)
- Design notes: [docs/design](./docs/design)
