import * as BABYLON from "babylonjs";
import { FocusTransitionState } from "../run/onBeforeRenderFocusTransition";

const FOCUS_TRANSITION_DURATION_SECONDS = 0.25;

export function ACTIONS_setFocusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3
): FocusTransitionState | null {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return null;

  return {
    elapsedSeconds: 0,
    durationSeconds: FOCUS_TRANSITION_DURATION_SECONDS,
    startRadius: camera.radius,
    startTarget: camera.target.clone(),
    endTarget: targetPosition.clone(),
    preventZoomOutOnFocus: !!(camera.metadata?.preventZoomOutOnFocus),
  };
}