import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

export function attachTextLabel(
  scene: BABYLON.Scene,
  mesh: BABYLON.AbstractMesh,
  text: string,
  offsetY = 20
) {
  // Create fullscreen UI if it doesn't exist
  let ui = scene.metadata?.ui as GUI.AdvancedDynamicTexture;

  if (!ui) {
    ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    scene.metadata = scene.metadata || {};
    scene.metadata.ui = ui;
  }

  // Create text block
  const label = new GUI.TextBlock();
  label.text = text;
  label.color = "white";
  label.fontSize = 30;
  label.outlineColor = "black";
  label.outlineWidth = 3;
 // label.background = "rgba(0,0,0,0.4)";
  label.paddingLeft = 4;
  label.paddingRight = 4;
  label.paddingTop = 2;
  label.paddingBottom = 2;

  // Link to mesh
  label.linkWithMesh(mesh);
  label.linkOffsetY = -offsetY;

  ui.addControl(label);

  return label;
}
