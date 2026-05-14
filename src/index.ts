export interface PackageDescriptor {
  readonly packageName: string;
  readonly featureFlagId: string;
  readonly envPrefix: string;
  readonly summary: string;
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
}

export interface OverlayAlertMarker {
  readonly markerId: string;
  readonly severity: "info" | "warning" | "danger";
  readonly anchorId: string;
}

export const PLAYER_SYSTEM_INTERFACE_PACKAGE = "@plasius/player-system-interface";
export const PLAYER_SYSTEM_INTERFACE_ENV_PREFIX = "PLAYER_SYSTEM_INTERFACE";
export const PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID =
  "isekai.player-system.packages.enabled";
export const PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID =
  PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID;

export const packageDescriptor: PackageDescriptor = Object.freeze({
  packageName: PLAYER_SYSTEM_INTERFACE_PACKAGE,
  featureFlagId: PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID,
  envPrefix: PLAYER_SYSTEM_INTERFACE_ENV_PREFIX,
  summary:
    "World-space Player System overlays, focus panes, and target-surface contracts for Plasius game experiences.",
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
