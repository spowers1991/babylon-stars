import * as BABYLON from "babylonjs";

export function attachCameraControl(camera: BABYLON.Camera, canvas?: HTMLCanvasElement): void {
  camera.attachControl(canvas, true);
}
