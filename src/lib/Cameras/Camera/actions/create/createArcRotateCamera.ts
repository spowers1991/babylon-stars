import * as BABYLON from "babylonjs";
import { ArcRotateCamera } from "../../types/ArcRotateCamera";

export function createArcRotateCamera(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  options: ArcRotateCamera
): BABYLON.ArcRotateCamera {
  const cam = new BABYLON.ArcRotateCamera(
    options.name,
    options.alpha ?? Math.PI / 2,
    options.beta ?? Math.PI / 2,
    options.radius ?? 5,
    options.target ?? BABYLON.Vector3.Zero(),
    scene
  );
  if (options.zoomSpeed !== undefined) {
    cam.wheelPrecision = options.zoomSpeed;
  }
  if (options.panSpeed !== undefined) {
    cam.panningSensibility = options.panSpeed;
  }
  if (options.preventZoomOutOnFocus !== undefined) {
    cam.metadata = {
      ...(cam.metadata ?? {}),
      focus: {
        ...(cam.metadata?.focus ?? {}),
        preventZoomOut: options.preventZoomOutOnFocus,
      },
    };
  }
  cam.attachControl(canvas, true);
  return cam;
}