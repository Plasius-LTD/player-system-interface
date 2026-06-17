import {
  PLAYER_SYSTEM_PACKAGES_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_RUNTIME_NFR_FEATURE_FLAG_ID,
  PLAYER_SYSTEM_RUNTIME_PORTABILITY_FEATURE_FLAG_ID,
  assessInterfaceShellDefinition,
  assessPlayerSystemInterfaceComposition,
  createFocusPaneShellDefinition,
  createInterfaceShellDefinition,
  createInterfaceShellSurfaceDefinition,
  createLineOfSightTargetPopupDefinition,
  createPlayerSystemInterfaceContract,
  createPlayerSystemInterfacePortabilityContract,
  createWorldSpacePanelDefinition,
  defaultReducedCombatOverlayPolicy,
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
      "isekai.player-system.interface.enabled"
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

  it("creates reusable focus-pane, popup, and shared shell definitions behind the story flag", () => {
    const shell = createInterfaceShellDefinition({
      surfaces: [
        createInterfaceShellSurfaceDefinition({
          surfaceId: "player-focus-surface",
          owner: "player-system",
          kind: "focus-pane",
          anchorId: "focus-pane-anchor",
          interactive: true,
          priority: 10,
          combatBehavior: "reduce",
        }),
        createInterfaceShellSurfaceDefinition({
          surfaceId: "party-status-surface",
          owner: "party-system",
          kind: "world-panel",
          anchorId: "party-strip-anchor",
          interactive: false,
          priority: 6,
          combatBehavior: "persist",
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
          actionLabel: "Inspect",
        }),
      ],
    });

    expect(shell.featureFlagId).toBe(PLAYER_SYSTEM_INTERFACE_FEATURE_FLAG_ID);
    expect(shell.reducedCombat).toEqual(defaultReducedCombatOverlayPolicy);
    expect(shell.focusPane?.pane).toBe("missions");
    expect(shell.targetPopups[0]?.requiresLineOfSight).toBe(true);
  });

  it("creates default shells with frozen empty collections and reduced-combat overrides", () => {
    const shell = createInterfaceShellDefinition({
      featureFlagId: "isekai.player-system.interface.override",
      reducedCombat: {
        retainedSurfaceKinds: [],
        maxInteractiveSurfaces: 0,
      },
    });

    expect(shell.featureFlagId).toBe("isekai.player-system.interface.override");
    expect(shell.focusPane).toBeUndefined();
    expect(shell.surfaces).toEqual([]);
    expect(shell.targetPopups).toEqual([]);
    expect(shell.reducedCombat.retainedSurfaceKinds).toEqual([]);
    expect(shell.reducedCombat.maxInteractiveSurfaces).toBe(0);
    expect(Object.isFrozen(shell.surfaces)).toBe(true);
    expect(Object.isFrozen(shell.targetPopups)).toBe(true);
    expect(Object.isFrozen(shell.reducedCombat.retainedSurfaceKinds)).toBe(true);
  });

  it("assesses coexistence and reduced-combat limits for Party/System shells", () => {
    const accepted = assessInterfaceShellDefinition(
      createInterfaceShellDefinition({
        surfaces: [
          createInterfaceShellSurfaceDefinition({
            surfaceId: "player-focus-surface",
            owner: "player-system",
            kind: "focus-pane",
            anchorId: "focus-pane-anchor",
            interactive: true,
            priority: 10,
            combatBehavior: "reduce",
          }),
          createInterfaceShellSurfaceDefinition({
            surfaceId: "party-status-surface",
            owner: "party-system",
            kind: "world-panel",
            anchorId: "party-strip-anchor",
            interactive: false,
            priority: 6,
            combatBehavior: "persist",
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
      })
    );
    const rejected = assessInterfaceShellDefinition(
      createInterfaceShellDefinition({
        surfaces: [
          createInterfaceShellSurfaceDefinition({
            surfaceId: "player-focus-surface",
            owner: "player-system",
            kind: "focus-pane",
            anchorId: "focus-pane-anchor",
            interactive: true,
            priority: 10,
            combatBehavior: "reduce",
          }),
          createInterfaceShellSurfaceDefinition({
            surfaceId: "extra-target-surface",
            owner: "player-system",
            kind: "target-popup",
            anchorId: "target-anchor",
            interactive: true,
            priority: 8,
            combatBehavior: "persist",
          }),
        ],
        focusPane: createFocusPaneShellDefinition({
          panelId: "mission-focus",
          owner: "party-system",
          pane: "missions",
          anchorId: "focus-pane-anchor",
          heading: "Mission focus",
          interactive: true,
          combatBehavior: "reduce",
        }),
      })
    );

    expect(accepted.accepted).toBe(true);
    expect(rejected.accepted).toBe(false);
    expect(rejected.violations).toEqual([
      "focusPaneOwner",
      "focusPaneSurface",
      "interactiveSurfaceCount",
    ]);
  });

  it("counts only retained interactive surfaces against the combat-safe limit", () => {
    const assessment = assessInterfaceShellDefinition(
      createInterfaceShellDefinition({
        surfaces: [
          createInterfaceShellSurfaceDefinition({
            surfaceId: "player-ledger-surface",
            owner: "player-system",
            kind: "world-panel",
            anchorId: "ledger-anchor",
            interactive: true,
            priority: 5,
            combatBehavior: "suspend",
          }),
        ],
        reducedCombat: {
          retainedSurfaceKinds: ["focus-pane"],
          maxInteractiveSurfaces: 0,
        },
      })
    );

    expect(assessment.accepted).toBe(true);
    expect(assessment.violations).toEqual([]);
  });

  it("flags empty shells and mixed-owner shells without retained reduced-combat surfaces", () => {
    const emptyShellAssessment = assessInterfaceShellDefinition(
      createInterfaceShellDefinition()
    );
    const mixedOwnerAssessment = assessInterfaceShellDefinition(
      createInterfaceShellDefinition({
        surfaces: [
          createInterfaceShellSurfaceDefinition({
            surfaceId: "player-status-surface",
            owner: "player-system",
            kind: "world-panel",
            anchorId: "player-anchor",
            interactive: false,
            priority: 4,
            combatBehavior: "persist",
          }),
          createInterfaceShellSurfaceDefinition({
            surfaceId: "party-status-surface",
            owner: "party-system",
            kind: "world-panel",
            anchorId: "party-anchor",
            interactive: false,
            priority: 3,
            combatBehavior: "persist",
          }),
        ],
        targetPopups: [
          createLineOfSightTargetPopupDefinition({
            popupId: "missing-los-anchor",
            owner: "player-system",
            anchorId: "",
            targetId: "forest-wolf",
            summary: "Missing anchor should be rejected",
            requiresLineOfSight: true,
          }),
        ],
        reducedCombat: {
          retainedSurfaceKinds: [],
        },
      })
    );

    expect(emptyShellAssessment.accepted).toBe(false);
    expect(emptyShellAssessment.violations).toEqual(["surfaces"]);
    expect(mixedOwnerAssessment.accepted).toBe(false);
    expect(mixedOwnerAssessment.violations).toEqual([
      "popup:missing-los-anchor",
      "reducedCombat",
    ]);
  });
});
