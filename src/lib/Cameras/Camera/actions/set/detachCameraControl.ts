import * as BABYLON from "babylonjs";

export function detachCameraControl(camera: BABYLON.Camera): void {
  camera.detachControl();
}
