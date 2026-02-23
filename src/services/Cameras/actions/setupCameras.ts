import * as BABYLON from "babylonjs";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";

export function setupCameras(scene: BABYLON.Scene, mainCamera: typeof MainCamera, canvas: HTMLCanvasElement) {

const camerasController = CamerasController.instance(scene);
    
camerasController.addCamera(canvas, mainCamera);

return camerasController.getCameras();
}