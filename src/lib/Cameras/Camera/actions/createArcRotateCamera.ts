import * as BABYLON from "babylonjs";
import { ArcRotateCamera } from "../types/ArcRotateCamera";

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
  cam.attachControl(canvas, true);
  return cam;
}