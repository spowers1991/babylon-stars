import * as BABYLON from "babylonjs";
import { stepCameraFocus as ACTIONS_stepCameraFocus } from "./stepCameraFocus";
import { runOnBeforeRender as ACTIONS_runOnBeforeRender } from "./runOnBeforeRender";

/**
 * Registers a per-frame observer that lerps the camera target toward targetPosition.
 */
export function runCameraFocus(
  camera: BABYLON.ArcRotateCamera,
  targetPosition: BABYLON.Vector3,
  speed = 2 // units per second
): void {
  const scene = camera.getScene();
  const startTarget = camera.target.clone();
  const state = { t: 0 };

  ACTIONS_runOnBeforeRender(scene, () =>
    ACTIONS_stepCameraFocus(scene, camera, startTarget, targetPosition, state, speed)
  );
}
