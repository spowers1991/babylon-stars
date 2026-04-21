import * as BABYLON from "babylonjs";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";

export function createCameras(scene: BABYLON.Scene, canvas: HTMLCanvasElement , mainCamera: typeof MainCamera, ) {

const camerasController = CamerasController.instance(scene);
    
camerasController.addCamera(canvas, mainCamera);

}