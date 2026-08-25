import * as BABYLON from "babylonjs";
import { CameraConfig } from "../../Camera/types/CameraConfig";
import { CameraController } from "../../Camera/CameraController";

export function createCamera(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  cameraConfig: CameraConfig,
  cameras: CameraController[]
): CameraController {
  const cameraController = new CameraController(scene, canvas, cameraConfig);
  cameras.push(cameraController);
  return cameraController;
}
