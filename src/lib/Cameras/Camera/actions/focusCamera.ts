import * as BABYLON from "babylonjs";

/**
 * Focuses a camera on a given target position.
 * Works for ArcRotateCamera and TargetCamera subclasses.
 * @param camera - The camera to focus
 * @param target - The world position to focus on
 */
export function focusCamera(
  camera: BABYLON.Camera,
  target: BABYLON.Vector3
) {
  // ArcRotateCamera supports setTarget
  if (camera instanceof BABYLON.ArcRotateCamera) {
    camera.setTarget(target);
    return;
  }

  // TargetCamera and subclasses (FreeCamera, UniversalCamera)
  if ("setTarget" in camera && typeof camera.setTarget === "function") {
    camera.setTarget(target);
    return;
  }

  // Fallback: do nothing if the camera cannot target
  console.warn("Camera type does not support setTarget", camera);
}
