import * as BABYLON from "babylonjs";

export function setFocusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  camera.focusOn({
    min: targetPosition,
    max: targetPosition,
    distance: 0,
  }, true);
}