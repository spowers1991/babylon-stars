import * as BABYLON from "babylonjs";
import type { CameraConfig } from "../../types/CameraConfig";
import { createFreeCamera } from "./createFreeCamera";
import { createArcRotateCamera } from "./createArcRotateCamera";
import type { FreeCameraConfig } from "../../types/FreeCameraConfig";
import type { ArcRotateCameraConfig } from "../../types/ArcRotateCameraConfig";

export function createCameraByType(
  cameraConfig: CameraConfig,
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement
): BABYLON.Camera {
  switch (cameraConfig.type) {
    case "free":
      return createFreeCamera(scene, canvas, cameraConfig as FreeCameraConfig);

    case "arcRotate":
      return createArcRotateCamera(scene, canvas, cameraConfig as ArcRotateCameraConfig);

    default:
      throw new Error("Unsupported camera type");
  }
}
