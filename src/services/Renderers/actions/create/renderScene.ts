import * as BABYLON from "babylonjs";

export function renderScene(scene: BABYLON.Scene) {
  return () => scene.render();
}
