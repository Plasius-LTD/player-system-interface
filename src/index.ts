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

export type InterfaceShellOwner = "player-system" | "party-system";
export type InterfaceShellSurfaceKind =
  | "world-panel"
  | "focus-pane"
  | "target-popup"
  | "alert-marker";
export type InterfaceCombatBehavior = "persist" | "reduce" | "suspend";

export interface InterfaceShellSurfaceDefinition {
  readonly surfaceId: string;
  readonly owner: InterfaceShellOwner;
  readonly kind: InterfaceShellSurfaceKind;
  readonly anchorId: string;
  readonly interactive: boolean;
  readonly priority: number;
  readonly combatBehavior: InterfaceCombatBehavior;
}

export interface FocusPaneShellDefinition {
  readonly panelId: string;
  readonly owner: InterfaceShellOwner;
  readonly pane: PlayerSystemPaneId;
  readonly anchorId: string;
  readonly heading: string;
  readonly interactive: boolean;
  readonly combatBehavior: InterfaceCombatBehavior;
}

export interface LineOfSightTargetPopupDefinition {
  readonly popupId: string;
  readonly owner: InterfaceShellOwner;
  readonly anchorId: string;
  readonly targetId: string;
  readonly summary: string;
  readonly requiresLineOfSight: boolean;
  readonly actionLabel?: string;
}

export interface ReducedCombatOverlayPolicy {
  readonly featureFlagId: string;
  readonly mode: "combat-safe";
  readonly retainedSurfaceKinds: readonly InterfaceShellSurfaceKind[];
  readonly maxInteractiveSurfaces: number;
}

export interface InterfaceShellDefinition {
  readonly featureFlagId: string;
  readonly surfaces: readonly InterfaceShellSurfaceDefinition[];
  readonly focusPane?: FocusPaneShellDefinition;
  readonly targetPopups: readonly LineOfSightTargetPopupDefinition[];
  readonly reducedCombat: ReducedCombatOverlayPolicy;
}

export interface InterfaceShellDefinitionInput {
  readonly featureFlagId?: string;
  readonly surfaces?: readonly InterfaceShellSurfaceDefinition[];
  readonly focusPane?: FocusPaneShellDefinition;
  readonly targetPopups?: readonly LineOfSightTargetPopupDefinition[];
  readonly reducedCombat?: Partial<ReducedCombatOverlayPolicy>;
}

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
export const PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID =
  "isekai.player-system.interface.enabled";
export const PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID =
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID;
export const PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID =
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID;
export const PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID =
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID;

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

export const defaultReducedCombatOverlayPolicy: ReducedCombatOverlayPolicy =
  Object.freeze({
    featureFlagId: PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID,
    mode: "combat-safe",
    retainedSurfaceKinds: Object.freeze([
      "alert-marker",
      "target-popup",
      "focus-pane",
    ] satisfies InterfaceShellSurfaceKind[]),
    maxInteractiveSurfaces: 1,
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

export function createInterfaceShellSurfaceDefinition(
  input: InterfaceShellSurfaceDefinition
): InterfaceShellSurfaceDefinition {
  return Object.freeze({ ...input });
}

export function createFocusPaneShellDefinition(
  input: FocusPaneShellDefinition
): FocusPaneShellDefinition {
  return Object.freeze({ ...input });
}

export function createLineOfSightTargetPopupDefinition(
  input: LineOfSightTargetPopupDefinition
): LineOfSightTargetPopupDefinition {
  return Object.freeze({ ...input });
}

export function createInterfaceShellDefinition(
  input: InterfaceShellDefinitionInput = {}
): InterfaceShellDefinition {
  return Object.freeze({
    featureFlagId: input.featureFlagId ?? PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID,
    surfaces: Object.freeze([...(input.surfaces ?? [])]),
    focusPane: input.focusPane ? Object.freeze({ ...input.focusPane }) : undefined,
    targetPopups: Object.freeze([...(input.targetPopups ?? [])]),
    reducedCombat: Object.freeze({
      ...defaultReducedCombatOverlayPolicy,
      ...input.reducedCombat,
      retainedSurfaceKinds: Object.freeze([
        ...(input.reducedCombat?.retainedSurfaceKinds ??
          defaultReducedCombatOverlayPolicy.retainedSurfaceKinds),
      ]),
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

export function assessInterfaceShellDefinition(
  shell: InterfaceShellDefinition
): InterfaceContractAssessment {
  const violations: string[] = [];
  const ownerSet = new Set(shell.surfaces.map((surface) => surface.owner));
  const retainedSurfaceKinds = new Set(shell.reducedCombat.retainedSurfaceKinds);
  const interactiveSurfaceCount = shell.surfaces.filter(
    (surface) => surface.interactive && retainedSurfaceKinds.has(surface.kind)
  ).length;
  const focusPane = shell.focusPane;

  if (shell.surfaces.length === 0) {
    violations.push("surfaces");
  }

  if (focusPane && !ownerSet.has(focusPane.owner)) {
    violations.push("focusPaneOwner");
  }

  if (focusPane) {
    const matchingSurface = shell.surfaces.find(
      (surface) =>
        surface.kind === "focus-pane" &&
        surface.anchorId === focusPane.anchorId &&
        surface.owner === focusPane.owner
    );
    if (!matchingSurface) {
      violations.push("focusPaneSurface");
    }
  }

  if (
    interactiveSurfaceCount > shell.reducedCombat.maxInteractiveSurfaces
  ) {
    violations.push("interactiveSurfaceCount");
  }

  for (const popup of shell.targetPopups) {
    if (popup.requiresLineOfSight && popup.anchorId.length === 0) {
      violations.push(`popup:${popup.popupId}`);
    }
  }

  if (
    ownerSet.has("player-system") &&
    ownerSet.has("party-system") &&
    shell.reducedCombat.retainedSurfaceKinds.length === 0
  ) {
    violations.push("reducedCombat");
  }

  return Object.freeze({
    accepted: violations.length === 0,
    violations: Object.freeze(violations),
  });
}
