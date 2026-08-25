import * as BABYLON from "babylonjs";

export interface StepCameraFocusState {
  t: number;
}

/**
 * Advances one lerp step toward the focus target; returns true once the lerp has completed.
 */
export function stepCameraFocus(
  scene: BABYLON.Scene,
  camera: BABYLON.ArcRotateCamera,
  startTarget: BABYLON.Vector3,
  targetPosition: BABYLON.Vector3,
  state: StepCameraFocusState,
  speed: number
): boolean {
  const dt = scene.getEngine().getDeltaTime() / 1000;
  state.t += dt * speed;

  const lerpT = Math.min(state.t, 1);

  BABYLON.Vector3.LerpToRef(startTarget, targetPosition, lerpT, camera.target);

  return lerpT >= 1;
}
