import * as BABYLON from "babylonjs";
import { setFocusCamera } from "@/lib/Cameras/Camera/actions/set/setFocusCamera";

// Helper to check if camera is panning (ArcRotateCamera only)
function isCameraPanning(camera: BABYLON.Camera): boolean {
  if (camera instanceof BABYLON.ArcRotateCamera) {
    // Babylon sets camera.panningAxis or camera._isPointerDown for panning, but not public API.
    // We can check camera._isPointerDown && camera._panning (private), or expose a flag elsewhere if needed.
    // For now, we conservatively return false (no panning) unless you want to patch ArcRotateCamera prototype.
    // TODO: Implement a robust panning detection if needed.
    return false;
  }
  return false;
}

export function handlePickFocus(camera: BABYLON.Camera, pick: any) {
  if (isCameraPanning(camera)) return; // Prevent focus if panning

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