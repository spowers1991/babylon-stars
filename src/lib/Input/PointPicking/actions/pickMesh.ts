import * as BABYLON from "babylonjs";

// Pick a mesh particle
export function pickMesh(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera
): BABYLON.PickingInfo | null {
  const pickInfo = scene.pick(scene.pointerX, scene.pointerY, undefined, false, camera);
  if (!pickInfo?.hit) return null;
  return pickInfo;
}