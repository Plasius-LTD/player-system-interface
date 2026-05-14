import {
  PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID,
  createWorldSpacePanelDefinition,
  isPlayerSystemInterfaceMode,
  packageDescriptor,
} from "../src/index.js";

describe("@plasius/player-system-interface", () => {
  it("exports the package descriptor", () => {
    expect(packageDescriptor.packageName).toBe("@plasius/player-system-interface");
    expect(packageDescriptor.featureFlagId).toBe(
      PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID
    );
    expect(PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID).toBe(
      PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID
    );
  });

  it("creates a panel definition", () => {
    const panel = createWorldSpacePanelDefinition({
      panelId: "status",
      pane: "identity",
      anchorId: "player",
      interactive: true,
    });

    expect(panel.anchorId).toBe("player");
  });

  it("guards valid interface modes", () => {
    expect(isPlayerSystemInterfaceMode("combat-safe")).toBe(true);
    expect(isPlayerSystemInterfaceMode("invalid")).toBe(false);
  });
});
