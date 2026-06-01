import {
  PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID,
  assessPlayerSystemInterfaceComposition,
  createPlayerSystemInterfaceContract,
  createPlayerSystemInterfacePortabilityContract,
  createWorldSpacePanelDefinition,
  defaultPlayerSystemInterfaceContract,
  defaultPlayerSystemInterfacePortabilityContract,
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

  it("accepts partial nested interface overrides from TypeScript consumers", () => {
    const input = {
      accessibility: {
        keyboardPath: "direct-hotkey",
        liveRegionMode: "assertive",
      },
      frameBudget: {
        maxInteractivePanelsPerFrame: 1,
      },
    } satisfies Parameters<typeof createPlayerSystemInterfaceContract>[0];

    const contract = createPlayerSystemInterfaceContract(input);

    expect(contract.accessibility.keyboardPath).toBe("direct-hotkey");
    expect(contract.accessibility.focusRestorationTarget).toBe("trigger");
    expect(contract.accessibility.liveRegionMode).toBe("assertive");
    expect(contract.frameBudget.targetFps).toBe(60);
    expect(contract.frameBudget.maxInteractivePanelsPerFrame).toBe(1);
  });

  it("exports a portability contract behind the inherited runtime-portability feature flag", () => {
    expect(defaultPlayerSystemInterfacePortabilityContract.featureFlagId).toBe(
      PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID
    );
    expect(
      defaultPlayerSystemInterfacePortabilityContract.hostAdapters.supportedHosts
    ).toEqual(["dom-overlay", "native-overlay", "headless-snapshot"]);
    expect(
      defaultPlayerSystemInterfacePortabilityContract.compositionScale.maxWorldPanels
    ).toBe(6);
  });

  it("creates overridable portability contracts with frozen nested arrays", () => {
    const contract = createPlayerSystemInterfacePortabilityContract({
      hostAdapters: {
        supportedHosts: ["headless-snapshot"],
      },
      compositionScale: {
        maxFocusPanes: 2,
      },
    });

    expect(contract.featureFlagId).toBe(
      PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID
    );
    expect(contract.hostAdapters.supportedHosts).toEqual(["headless-snapshot"]);
    expect(contract.compositionScale.maxFocusPanes).toBe(2);
    expect(Object.isFrozen(contract.hostAdapters.supportedHosts)).toBe(true);
  });

  it("keeps default supported hosts when only host capabilities change", () => {
    const contract = createPlayerSystemInterfacePortabilityContract({
      hostAdapters: {
        requiredCapabilities: ["live-region"],
      },
    });

    expect(contract.hostAdapters.supportedHosts).toEqual(
      defaultPlayerSystemInterfacePortabilityContract.hostAdapters.supportedHosts
    );
    expect(contract.hostAdapters.requiredCapabilities).toEqual(["live-region"]);
  });

  it("assesses multi-pane and multi-overlay samples against the documented scale assumptions", () => {
    const accepted = assessPlayerSystemInterfaceComposition({
      panelCount: 6,
      focusPaneCount: 3,
      alertMarkerCount: 8,
      interactivePanelCount: 2,
    });
    const rejected = assessPlayerSystemInterfaceComposition({
      panelCount: 7,
      focusPaneCount: 4,
      alertMarkerCount: 9,
      interactivePanelCount: 3,
    });

    expect(accepted.accepted).toBe(true);
    expect(rejected.accepted).toBe(false);
    expect(rejected.violations).toEqual([
      "panelCount",
      "focusPaneCount",
      "alertMarkerCount",
      "interactivePanelCount",
    ]);
  });
});
