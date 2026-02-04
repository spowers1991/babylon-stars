import * as BABYLON from "babylonjs";
import { focusCamera } from "@/lib/Cameras/Camera/actions/focusCamera";

export function handlePickFocus(camera: BABYLON.Camera, pick: any) {
  let position: BABYLON.Vector3 | undefined;

  if (pick?.pickedMesh) {
    position = pick.pickedMesh.position;
  } else if (pick?.position) {
    position = pick.position;
  }

  if (position) {
    focusCamera(camera, position);
  }
}