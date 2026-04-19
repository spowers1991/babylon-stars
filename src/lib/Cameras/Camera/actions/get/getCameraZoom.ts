import * as BABYLON from "babylonjs";

export function getCameraZoom(camera: BABYLON.Camera): number | null {
    if (camera && camera instanceof BABYLON.ArcRotateCamera) {
        return camera.radius;
    }
    
    return null;
}