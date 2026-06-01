export interface PackageDescriptor {
  readonly packageName: string;
  readonly featureFlagId: string;
  readonly envPrefix: string;
  readonly summary: string;
}

export type OverlayKeyboardPath = "sequential" | "direct-hotkey" | "read-only";

export interface OverlayAccessibilityContract {
  readonly keyboardPath: OverlayKeyboardPath;
  readonly focusRestorationTarget: "trigger" | "pane-heading" | "nearest-anchor";
  readonly liveRegionMode: "polite" | "assertive" | "off";
  readonly requiresAccessibleName: boolean;
}

export interface InterfaceFrameBudget {
  readonly targetFps: number;
  readonly maxFrameMs: number;
  readonly maxInteractivePanelsPerFrame: number;
}

export type OverlayHostKind =
  | "dom-overlay"
  | "native-overlay"
  | "headless-snapshot";

export type OverlayAdapterCapability =
  | "focus-restoration"
  | "live-region"
  | "anchor-registry";

export interface OverlayHostAdapterContract {
  readonly supportedHosts: readonly OverlayHostKind[];
  readonly requiredCapabilities: readonly OverlayAdapterCapability[];
  readonly forbiddenAssumptions: readonly string[];
}

export interface OverlayCompositionScaleContract {
  readonly maxWorldPanels: number;
  readonly maxFocusPanes: number;
  readonly maxAlertMarkers: number;
  readonly maxInteractivePanelsPerFrame: number;
}

export interface PlayerSystemInterfaceContract {
  readonly featureFlagId: string;
  readonly accessibility: OverlayAccessibilityContract;
  readonly frameBudget: InterfaceFrameBudget;
}

export interface PlayerSystemInterfacePortabilityContract {
  readonly featureFlagId: string;
  readonly hostAdapters: OverlayHostAdapterContract;
  readonly compositionScale: OverlayCompositionScaleContract;
}

export interface PlayerSystemInterfaceContractInput {
  readonly featureFlagId?: string;
  readonly accessibility?: Partial<OverlayAccessibilityContract>;
  readonly frameBudget?: Partial<InterfaceFrameBudget>;
}

export interface PlayerSystemInterfacePortabilityContractInput {
  readonly featureFlagId?: string;
  readonly hostAdapters?: Partial<OverlayHostAdapterContract>;
  readonly compositionScale?: Partial<OverlayCompositionScaleContract>;
}

export type PlayerSystemInterfaceMode = "ambient" | "focused" | "combat-safe";

export type PlayerSystemPaneId =
  | "identity"
  | "missions"
  | "guild-quests"
  | "logs"
  | "mcc"
  | "tutorial"
  | "points-store";

export interface WorldSpacePanelDefinition {
  readonly panelId: string;
  readonly pane: PlayerSystemPaneId;
  readonly anchorId: string;
  readonly interactive: boolean;
  readonly accessibilityLabel?: string;
  readonly focusOrder?: number;
}

export interface OverlayAlertMarker {
  readonly markerId: string;
  readonly severity: "info" | "warning" | "danger";
  readonly anchorId: string;
}

export interface WorldSpaceCompositionSample {
  readonly panelCount: number;
  readonly focusPaneCount: number;
  readonly alertMarkerCount: number;
  readonly interactivePanelCount: number;
}

export interface InterfaceContractAssessment {
  readonly accepted: boolean;
  readonly violations: readonly string[];
}

export const PLAYER_SYSTEM_INTERFACE_PACKAGE = "@plasius/player-system-interface";
export const PLAYER_SYSTEM_INTERFACE_ENV_PREFIX = "PLAYER_SYSTEM_INTERFACE";
export const PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID =
  "isekai.player-system.packages.enabled";
export const PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID =
  PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID;
export const PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID =
  "isekai.player-system.runtime-nfr.enabled";
export const PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID =
  "isekai.player-system.runtime-portability.enabled";

export const packageDescriptor: PackageDescriptor = Object.freeze({
  packageName: PLAYER_SYSTEM_INTERFACE_PACKAGE,
  featureFlagId: PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID,
  envPrefix: PLAYER_SYSTEM_INTERFACE_ENV_PREFIX,
  summary:
    "World-space Player System overlays, focus panes, and target-surface contracts for Plasius game experiences.",
});

export const defaultPlayerSystemInterfaceContract: PlayerSystemInterfaceContract =
  Object.freeze({
    featureFlagId: PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID,
    accessibility: Object.freeze({
      keyboardPath: "sequential",
      focusRestorationTarget: "trigger",
      liveRegionMode: "polite",
      requiresAccessibleName: true,
    }),
    frameBudget: Object.freeze({
      targetFps: 60,
      maxFrameMs: 16,
      maxInteractivePanelsPerFrame: 2,
    }),
  });

export const defaultPlayerSystemInterfacePortabilityContract: PlayerSystemInterfacePortabilityContract =
  Object.freeze({
    featureFlagId: PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID,
    hostAdapters: Object.freeze({
      supportedHosts: Object.freeze([
        "dom-overlay",
        "native-overlay",
        "headless-snapshot",
      ] satisfies OverlayHostKind[]),
      requiredCapabilities: Object.freeze([
        "focus-restoration",
        "live-region",
        "anchor-registry",
      ] satisfies OverlayAdapterCapability[]),
      forbiddenAssumptions: Object.freeze([
        "window-global",
        "single-pane-layout",
        "absolute-scene-coordinates",
      ]),
    }),
    compositionScale: Object.freeze({
      maxWorldPanels: 6,
      maxFocusPanes: 3,
      maxAlertMarkers: 8,
      maxInteractivePanelsPerFrame: 2,
    }),
  });

export function isPlayerSystemInterfaceMode(
  value: string
): value is PlayerSystemInterfaceMode {
  return value === "ambient" || value === "focused" || value === "combat-safe";
}

export function createWorldSpacePanelDefinition(
  input: WorldSpacePanelDefinition
): WorldSpacePanelDefinition {
  return Object.freeze({ ...input });
}

export function createPlayerSystemInterfaceContract(
  input: PlayerSystemInterfaceContractInput = {}
): PlayerSystemInterfaceContract {
  return Object.freeze({
    featureFlagId:
      input.featureFlagId ?? defaultPlayerSystemInterfaceContract.featureFlagId,
    accessibility: Object.freeze({
      ...defaultPlayerSystemInterfaceContract.accessibility,
      ...input.accessibility,
    }),
    frameBudget: Object.freeze({
      ...defaultPlayerSystemInterfaceContract.frameBudget,
      ...input.frameBudget,
    }),
  });
}

export function createPlayerSystemInterfacePortabilityContract(
  input: PlayerSystemInterfacePortabilityContractInput = {}
): PlayerSystemInterfacePortabilityContract {
  return Object.freeze({
    featureFlagId:
      input.featureFlagId ??
      defaultPlayerSystemInterfacePortabilityContract.featureFlagId,
    hostAdapters: Object.freeze({
      ...defaultPlayerSystemInterfacePortabilityContract.hostAdapters,
      ...input.hostAdapters,
      supportedHosts: Object.freeze([
        ...(input.hostAdapters?.supportedHosts ??
          defaultPlayerSystemInterfacePortabilityContract.hostAdapters
            .supportedHosts),
      ]),
      requiredCapabilities: Object.freeze([
        ...(input.hostAdapters?.requiredCapabilities ??
          defaultPlayerSystemInterfacePortabilityContract.hostAdapters
            .requiredCapabilities),
      ]),
      forbiddenAssumptions: Object.freeze([
        ...(input.hostAdapters?.forbiddenAssumptions ??
          defaultPlayerSystemInterfacePortabilityContract.hostAdapters
            .forbiddenAssumptions),
      ]),
    }),
    compositionScale: Object.freeze({
      ...defaultPlayerSystemInterfacePortabilityContract.compositionScale,
      ...input.compositionScale,
    }),
  });
}

export function assessPlayerSystemInterfaceComposition(
  sample: WorldSpaceCompositionSample,
  contract: PlayerSystemInterfacePortabilityContract = defaultPlayerSystemInterfacePortabilityContract
): InterfaceContractAssessment {
  const violations: string[] = [];

  if (sample.panelCount > contract.compositionScale.maxWorldPanels) {
    violations.push("panelCount");
  }

  if (sample.focusPaneCount > contract.compositionScale.maxFocusPanes) {
    violations.push("focusPaneCount");
  }

  if (sample.alertMarkerCount > contract.compositionScale.maxAlertMarkers) {
    violations.push("alertMarkerCount");
  }

  if (
    sample.interactivePanelCount >
    contract.compositionScale.maxInteractivePanelsPerFrame
  ) {
    violations.push("interactivePanelCount");
  }

  return Object.freeze({
    accepted: violations.length === 0,
    violations: Object.freeze(violations),
  });
}
