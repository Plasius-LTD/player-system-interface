import { createWorldSpacePanelDefinition, packageDescriptor } from "../dist/index.js";

const panel = createWorldSpacePanelDefinition({
  panelId: "demo-pane",
  pane: "missions",
  anchorId: "player-head",
  interactive: true,
});

console.log(packageDescriptor);
console.log(panel);
