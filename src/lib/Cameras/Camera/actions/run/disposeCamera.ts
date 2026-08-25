import * as BABYLON from "babylonjs";

export function disposeCamera(camera: BABYLON.Camera): void {
  camera.detachControl();
  camera.dispose();
}
