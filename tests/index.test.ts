import {
  PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID,
  createPlayerSystemInterfaceContract,
  createWorldSpacePanelDefinition,
  defaultPlayerSystemInterfaceContract,
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
      accessibilityLabel: "Player status",
      focusOrder: 1,
    });

    expect(panel.anchorId).toBe("player");
    expect(panel.accessibilityLabel).toBe("Player status");
  });

  it("guards valid interface modes", () => {
    expect(isPlayerSystemInterfaceMode("combat-safe")).toBe(true);
    expect(isPlayerSystemInterfaceMode("invalid")).toBe(false);
  });

  it("exports default accessibility and frame budgets behind the inherited feature flag", () => {
    expect(defaultPlayerSystemInterfaceContract.featureFlagId).toBe(
      PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID
    );
    expect(defaultPlayerSystemInterfaceContract.accessibility.keyboardPath).toBe(
      "sequential"
    );
    expect(defaultPlayerSystemInterfaceContract.frameBudget.maxFrameMs).toBe(16);
  });

  it("creates overridable interface contracts with frozen nested policies", () => {
    const contract = createPlayerSystemInterfaceContract({
      accessibility: {
        keyboardPath: "direct-hotkey",
        liveRegionMode: "assertive",
      },
      frameBudget: {
        maxInteractivePanelsPerFrame: 1,
      },
    });

    expect(contract.featureFlagId).toBe(PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID);
    expect(contract.accessibility.keyboardPath).toBe("direct-hotkey");
    expect(contract.accessibility.focusRestorationTarget).toBe("trigger");
    expect(contract.frameBudget.maxInteractivePanelsPerFrame).toBe(1);
    expect(Object.isFrozen(contract.accessibility)).toBe(true);
    expect(Object.isFrozen(contract.frameBudget)).toBe(true);
  });
});
