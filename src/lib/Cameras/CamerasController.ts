import * as BABYLON from "babylonjs";
import { CameraConfig } from "./Camera/types/CameraConfig";
import { createCameraByType as ACTIONS_createCameraByType } from "./Camera/factories/createCameraByType";
import { getCameraZoom as ACTIONS_getCameraZoom } from "./Camera/actions/get/getCameraZoom";
import { getCameraZoomClamped as ACTIONS_getCameraZoomClamped } from "./Camera/actions/get/getCameraZoomClamped";
import {
  getCameraDistanceToMeshClamped as ACTIONS_getCameraDistanceToMeshClamped,
  GetCameraDistanceToMeshClampedOptions,
} from "./Camera/actions/get/getCameraDistanceToMeshClamped";
import { ACTIONS_setFocusCamera } from "./Camera/actions/set/setFocusCamera";
import {
  ACTIONS_onBeforeRenderFocusTransition,
  FocusTransitionState,
} from "./Camera/actions/run/onBeforeRenderFocusTransition";

export class CamerasController {

  private readonly scene: BABYLON.Scene;

  private static instances = new WeakMap<BABYLON.Scene, CamerasController>();
  private cameras: BABYLON.Camera[] = [];
  private activeCamera?: BABYLON.Camera;

  private focusCamera: BABYLON.ArcRotateCamera | null = null;
  private focusState: FocusTransitionState | null = null;

  private constructor(scene: BABYLON.Scene) {
      this.scene = scene;
      this.scene.onBeforeRenderObservable.add(this._onBeforeRender);
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

  public pickFocus(camera: BABYLON.ArcRotateCamera, target: BABYLON.Vector3): void {
    const state = ACTIONS_setFocusCamera(camera, target);
    if (!state) return;
    this.focusCamera = camera;
    this.focusState = state;
  }

  private _onBeforeRender = (): void => {
    if (!this.focusCamera || !this.focusState) return;

    const dtSeconds = this.scene.getEngine().getDeltaTime() / 1000;
    const { done, nextState } = ACTIONS_onBeforeRenderFocusTransition(
      this.focusCamera,
      dtSeconds,
      this.focusState
    );

    if (done) {
      this.focusCamera = null;
      this.focusState = null;
    } else {
      this.focusState = nextState;
    }
  };

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
