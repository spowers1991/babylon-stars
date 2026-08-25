import * as BABYLON from "babylonjs";
import { ArcRotateCameraConfig } from "../../types/ArcRotateCameraConfig";

export function createArcRotateCamera(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  options: ArcRotateCameraConfig
): BABYLON.ArcRotateCamera {
  const cam = new BABYLON.ArcRotateCamera(
    options.name,
    options.alpha ?? Math.PI / 2,
    options.beta ?? Math.PI / 4,
    options.radius ?? 10,
    options.target ?? BABYLON.Vector3.Zero(),
    scene
  );
  if (options.lowerRadiusLimit !== undefined) {
    cam.lowerRadiusLimit = options.lowerRadiusLimit;
  }
  if (options.upperRadiusLimit !== undefined) {
    cam.upperRadiusLimit = options.upperRadiusLimit;
  }
  if (options.zoomSpeed !== undefined) {
    cam.wheelPrecision = options.zoomSpeed;
  }
  if (options.panSpeed !== undefined) {
    cam.panningSensibility = options.panSpeed;
  }
  cam.attachControl(canvas, true);
  return cam;
}