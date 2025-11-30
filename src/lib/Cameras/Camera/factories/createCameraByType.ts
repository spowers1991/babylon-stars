import * as BABYLON from "babylonjs";
import type { CameraConfig } from "../types/CameraConfig";

export function createCameraByType(
  cameraConfig: CameraConfig,
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement
): BABYLON.Camera {
  switch (cameraConfig.type) {
    case "free": {
      const position = cameraConfig.position ?? new BABYLON.Vector3(0, 5, -10);
      const camera = new BABYLON.FreeCamera(cameraConfig.name, position, scene);
      camera.attachControl(canvas, true);
      return camera;
    }

    case "arcRotate": {
      const alpha = cameraConfig.alpha ?? Math.PI / 2;
      const beta = cameraConfig.beta ?? Math.PI / 4;
      const radius = cameraConfig.radius ?? 10;
      const target = cameraConfig.target ?? new BABYLON.Vector3(0, 0, 0);

      const arcCamera = new BABYLON.ArcRotateCamera(
        cameraConfig.name,
        alpha,
        beta,
        radius,
        target,
        scene
      );
      arcCamera.attachControl(canvas, true);
      return arcCamera;
    }

    default:
      throw new Error("Unsupported camera type");
  }
}
