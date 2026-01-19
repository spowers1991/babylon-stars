import * as BABYLON from "babylonjs";
import { CameraConfig } from "./Camera/types/CameraConfig";
import { createCameraByType } from "./Camera/factories/createCameraByType";

export class CamerasController {

  private readonly scene: BABYLON.Scene;

  private static instances = new WeakMap<BABYLON.Scene, CamerasController>();
  private cameras: BABYLON.Camera[] = [];
  private activeCamera?: BABYLON.Camera;

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
  ): BABYLON.Camera {
    const cam = createCameraByType(cameraConfig, this.scene, canvas);
    this.cameras.push(cam);

    if (!this.activeCamera) {
      this.setActiveCamera(cam);
    }

    return cam;
  }

  /**
   * Sets the active camera for the scene.
   */
  public setActiveCamera(camera: BABYLON.Camera): void {
    this.scene.activeCamera?.detachControl();
    this.scene.activeCamera = camera;
    camera.attachControl();
    this.activeCamera = camera;
  }

  public getActiveCamera(): BABYLON.Camera | undefined {
    return this.activeCamera;
  }

  /**
   * Returns all cameras currently managed by the controller.
   */
  public getCameras(): BABYLON.Camera[] {
    return this.cameras;
  }

  /**
   * Removes and disposes of a camera at the specified index.
   */
  public removeCamera(index: number): void {
    const cam = this.cameras[index];
    if (!cam) return;

    if (this.activeCamera === cam) {
      cam.detachControl();
      this.activeCamera = undefined;
      this.scene.activeCamera = null;
    }

    cam.dispose();
    this.cameras.splice(index, 1);
  }

  /**
   * Disposes of all cameras and clears the list.
   */
  public disposeAll(): void {
    this.cameras.forEach(cam => {
      cam.detachControl();
      cam.dispose();
    });

    this.cameras = [];
    this.activeCamera = undefined;
    this.scene.activeCamera = null;
  }
}
