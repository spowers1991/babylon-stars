import * as BABYLON from "babylonjs";
import { CameraConfig } from "./Camera/types/CameraConfig";
import { createCameraByType } from "./Camera/factories/createCameraByType";


export class CamerasController {
  private cameras: BABYLON.Camera[] = [];

  /**
   * Creates and stores a new camera of the given type.
   */
   public addCamera(
    scene: BABYLON.Scene,
    canvas: HTMLCanvasElement,
    cameraConfig: CameraConfig
  ): BABYLON.Camera {
    const cam = createCameraByType(cameraConfig, scene, canvas);
    //this.cameras.push(cam);
    return cam;
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
    if (cam) {
      cam.detachControl();
      cam.dispose();
      this.cameras.splice(index, 1);
    }
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
  }
}
