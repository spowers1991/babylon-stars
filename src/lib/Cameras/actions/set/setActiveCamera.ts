import * as BABYLON from "babylonjs";
import { CameraController } from "../../Camera/CameraController";

export function setActiveCamera(
  scene: BABYLON.Scene,
  cameraController: CameraController,
  previousActiveCamera?: CameraController
): void {
  previousActiveCamera?.detachControl();
  scene.activeCamera = cameraController.camera;
  cameraController.attachControl();
}
