import * as BABYLON from "babylonjs";
import { CameraController } from "../../Camera/CameraController";

export function disposeAllCameras(scene: BABYLON.Scene, cameras: CameraController[]): void {
  cameras.forEach(cam => cam.dispose());
  cameras.length = 0;
  scene.activeCamera = null;
}
