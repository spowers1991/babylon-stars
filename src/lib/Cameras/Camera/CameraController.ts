import * as BABYLON from "babylonjs";
import { CameraConfig } from "./types/CameraConfig";
import { createCameraByType as ACTIONS_createCameraByType } from "./actions/create/createCameraByType";
import { getCameraZoom as ACTIONS_getCameraZoom, GetCameraZoomOptions } from "./actions/get/getCameraZoom";
import {
  getCameraDistanceToMeshClamped as ACTIONS_getCameraDistanceToMeshClamped,
  GetCameraDistanceToMeshClampedOptions,
} from "./actions/get/getCameraDistanceToMeshClamped";
import { attachCameraControl as ACTIONS_attachCameraControl } from "./actions/set/attachCameraControl";
import { detachCameraControl as ACTIONS_detachCameraControl } from "./actions/set/detachCameraControl";
import { disposeCamera as ACTIONS_disposeCamera } from "./actions/run/disposeCamera";
import { runCameraFocus as ACTIONS_runCameraFocus } from "./actions/run/runCameraFocus";
import { runOnBeforeRender as ACTIONS_runOnBeforeRender } from "./actions/run/runOnBeforeRender";

/**
 * Wraps a single BABYLON.Camera together with the config it was created from.
 */
export class CameraController {
  public readonly camera: BABYLON.Camera;
  public readonly config: CameraConfig;

  constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement, config: CameraConfig) {
    this.config = config;
    this.camera = ACTIONS_createCameraByType(config, scene, canvas);
  }

  public attachControl(canvas?: HTMLCanvasElement): void {
    ACTIONS_attachCameraControl(this.camera, canvas);
  }

  public detachControl(): void {
    ACTIONS_detachCameraControl(this.camera);
  }

  public getZoomLevel(options?: GetCameraZoomOptions): number | null {
    return ACTIONS_getCameraZoom(this.camera, options);
  }

  public getDistanceToMeshClamped(
    targetMesh: BABYLON.AbstractMesh,
    options?: GetCameraDistanceToMeshClampedOptions
  ): number | null {
    return ACTIONS_getCameraDistanceToMeshClamped(this.camera, targetMesh, options);
  }

  public focusOn(targetPosition: BABYLON.Vector3, speed?: number): void {
    if (this.camera instanceof BABYLON.ArcRotateCamera) {
      ACTIONS_runCameraFocus(this.camera, targetPosition, speed);
    }
  }

  public runOnBeforeRender(callback: () => boolean | void): void {
    ACTIONS_runOnBeforeRender(this.camera.getScene(), callback);
  }

  public dispose(): void {
    ACTIONS_disposeCamera(this.camera);
  }
}
