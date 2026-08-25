import * as BABYLON from "babylonjs";
import { CameraController } from "../../Camera/CameraController";

export function removeCamera(
  scene: BABYLON.Scene,
  cameras: CameraController[],
  index: number,
  activeCamera?: CameraController
): CameraController | undefined {
  const cam = cameras[index];
  if (!cam) return activeCamera;

  let nextActiveCamera = activeCamera;
  if (activeCamera === cam) {
    cam.detachControl();
    nextActiveCamera = undefined;
    scene.activeCamera = null;
  }

  cam.dispose();
  cameras.splice(index, 1);

  return nextActiveCamera;
}
