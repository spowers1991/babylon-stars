import * as BABYLON from "babylonjs";

export interface FocusTransitionState {
  elapsedSeconds: number;
  durationSeconds: number;
  startRadius: number;
  startTarget: BABYLON.Vector3;
  endTarget: BABYLON.Vector3;
  preventZoomOutOnFocus: boolean;
}

export function ACTIONS_onBeforeRenderFocusTransition(
  camera: BABYLON.ArcRotateCamera,
  dtSeconds: number,
  state: FocusTransitionState
): { done: boolean; nextState: FocusTransitionState } {
  const elapsedSeconds = state.elapsedSeconds + dtSeconds;
  const t = Math.min(elapsedSeconds / state.durationSeconds, 1);
  const currentTarget = BABYLON.Vector3.Lerp(state.startTarget, state.endTarget, t);

  camera.focusOn({ min: currentTarget, max: currentTarget, distance: 0 }, true);

  if (state.preventZoomOutOnFocus && camera.radius > state.startRadius) {
    camera.radius = state.startRadius;
  }

  return { done: t >= 1, nextState: { ...state, elapsedSeconds } };
}
