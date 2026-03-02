import * as BABYLON from "babylonjs";
import { setFocusCamera } from "@/lib/Cameras/Camera/actions/set/setFocusCamera";

export function handlePickFocus(camera: BABYLON.Camera, pick: any) {
  let position: BABYLON.Vector3 | undefined;

  if (pick?.pickedMesh) {
    position = pick.pickedMesh.position;
  } else if (pick?.position) {
    position = pick.position;
  }

  if (position) {
    setFocusCamera(camera, position);
  }
}