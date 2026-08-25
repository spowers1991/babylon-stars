import * as BABYLON from "babylonjs";
import { runCameraFocus as ACTIONS_runCameraFocus } from "../run/runCameraFocus";

export function setFocusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3,
  speed = 2 // units per second
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  ACTIONS_runCameraFocus(camera, targetPosition, speed);
}