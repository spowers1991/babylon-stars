import * as BABYLON from "babylonjs";

export function setCameraZoom(cameras: BABYLON.Camera[], index: number, distance: number) {
const cam = cameras[index];
    if (cam && cam instanceof BABYLON.ArcRotateCamera) {
        cam.radius = distance;
    }
}