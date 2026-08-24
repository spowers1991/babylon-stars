import * as BABYLON from "babylonjs";
import { CamerasController } from "@/lib/Cameras/CamerasController";

interface PickFocusTarget {
  pickedMesh?: {
    position: BABYLON.Vector3;
  };
  position?: BABYLON.Vector3;
}

function isCameraPanning(camera: BABYLON.Camera | unknown): boolean {
  if (camera instanceof BABYLON.ArcRotateCamera) {
    return false;
  }
  return false;
}

export function setPickFocus(camera: BABYLON.Camera | unknown, pick: PickFocusTarget | null | undefined) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;
  if (isCameraPanning(camera)) return;

  let position: BABYLON.Vector3 | undefined;

  if (pick?.pickedMesh) {
    position = pick.pickedMesh.position;
  } else if (pick?.position) {
    position = pick.position;
  }

  if (position) {
    CamerasController.instance(camera.getScene()).pickFocus(camera, position);
  }
}