import * as BABYLON from "babylonjs";
import { CameraConfig } from "./Camera/types/CameraConfig";
import { CameraController } from "./Camera/CameraController";
import { createCamera as ACTIONS_createCamera } from "./actions/create/createCamera";
import { setActiveCamera as ACTIONS_setActiveCamera } from "./actions/set/setActiveCamera";
import { getActiveCamera as ACTIONS_getActiveCamera } from "./actions/get/getActiveCamera";
import { getCameras as ACTIONS_getCameras } from "./actions/get/getCameras";
import { removeCamera as ACTIONS_removeCamera } from "./actions/set/removeCamera";
import { disposeAllCameras as ACTIONS_disposeAllCameras } from "./actions/run/disposeAllCameras";

export class CamerasController {

  private readonly scene: BABYLON.Scene;

  private static instances = new WeakMap<BABYLON.Scene, CamerasController>();
  private cameras: CameraController[] = [];
  private activeCamera?: CameraController;

  private constructor(scene: BABYLON.Scene) {
      this.scene = scene;
  }

  public static instance(scene: BABYLON.Scene): CamerasController {
    let controller = this.instances.get(scene);
    if (!controller) {
      controller = new CamerasController(scene);
      this.instances.set(scene, controller);
    }
    return controller;
  }

  public addCamera(
    canvas: HTMLCanvasElement,
    cameraConfig: CameraConfig
  ): CameraController {
    const cameraController = ACTIONS_createCamera(this.scene, canvas, cameraConfig, this.cameras);

    if (!this.activeCamera) {
      this.setActiveCamera(cameraController);
    }

    return cameraController;
  }

  /**
   * Sets the active camera for the scene.
   */
  public setActiveCamera(cameraController: CameraController): void {
    ACTIONS_setActiveCamera(this.scene, cameraController, this.activeCamera);
    this.activeCamera = cameraController;
  }

  public getActiveCamera(): CameraController | undefined {
    return ACTIONS_getActiveCamera(this.activeCamera);
  }

  /**
   * Returns all cameras currently managed by the controller.
   */
  public getCameras(): CameraController[] {
    return ACTIONS_getCameras(this.cameras);
  }

  /**
   * Removes and disposes of a camera at the specified index.
   */
  public removeCamera(index: number): void {
    this.activeCamera = ACTIONS_removeCamera(this.scene, this.cameras, index, this.activeCamera);
  }

  /**
   * Disposes of all cameras and clears the list.
   */
  public disposeAll(): void {
    ACTIONS_disposeAllCameras(this.scene, this.cameras);
    this.activeCamera = undefined;
  }
}
