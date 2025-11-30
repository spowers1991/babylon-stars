import * as BABYLON from "babylonjs";
import { FreeCamera } from "../types/FreeCamera";

export function createFreeCamera(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  options: FreeCamera
): BABYLON.FreeCamera {
  const cam = new BABYLON.FreeCamera(
    options.name,
    options.position ?? new BABYLON.Vector3(0, 5, -10),
    scene
  );
  cam.attachControl(canvas, true);
  return cam;
}
