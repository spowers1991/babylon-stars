import * as BABYLON from "babylonjs";
import { CameraConfig } from "./Camera/types/CameraConfig";
import { createCameraByType as ACTIONS_createCameraByType } from "./Camera/factories/createCameraByType";
import { getCameraZoom as ACTIONS_getCameraZoom } from "./Camera/actions/get/getCameraZoom";
import { getCameraZoomClamped as ACTIONS_getCameraZoomClamped } from "./Camera/actions/get/getCameraZoomClamped";
import {
  getCameraDistanceToMeshClamped as ACTIONS_getCameraDistanceToMeshClamped,
  GetCameraDistanceToMeshClampedOptions,
} from "./Camera/actions/get/getCameraDistanceToMeshClamped";

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
    const cam = ACTIONS_createCameraByType(cameraConfig, this.scene, canvas);
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

  public getZoomLevel(camera?: BABYLON.Camera, options?: { inverted?: boolean, minZoom?: number, maxZoom?: number }): number | null {
    return ACTIONS_getCameraZoom(camera || this.activeCamera!, options);
  }

  public getZoomLevelClamped(camera?: BABYLON.Camera, options?: { inverted?: boolean }): number | null {
    return ACTIONS_getCameraZoomClamped(camera || this.activeCamera!, options);
  }

  public getDistanceToMeshClamped(
    targetMesh: BABYLON.AbstractMesh,
    camera?: BABYLON.Camera,
    options?: GetCameraDistanceToMeshClampedOptions
  ): number | null {
    return ACTIONS_getCameraDistanceToMeshClamped(
      camera || this.activeCamera!,
      targetMesh,
      options
    );
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
