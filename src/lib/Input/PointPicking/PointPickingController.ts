import * as BABYLON from "babylonjs";
import { handlePointerEvent } from "./actions/helpers/handlePointerEvent";

export class PointPickingController {
  private static _instance: PointPickingController | null = null;

  private scene!: BABYLON.Scene;
  private camera?: BABYLON.Camera;

  public closestPicksPCS: BABYLON.CloudPoint[] = [];
  public closestPicksSPS: BABYLON.SolidParticle[] = [];

  private constructor(scene: BABYLON.Scene) {
    this.scene = scene;
  }

  public static instance(scene?: BABYLON.Scene): PointPickingController {
    if (!PointPickingController._instance) {
      if (!scene) {
        throw new Error(
          "PointPickingController.instance(scene) must be called once with a BABYLON.Scene"
        );
      }
      PointPickingController._instance = new PointPickingController(scene);
    }

    return PointPickingController._instance;
  }

  // ─────────────────────────────────────────────
  // Camera lifecycle
  // ─────────────────────────────────────────────
  public setCamera(camera: BABYLON.Camera) {
    this.camera = camera;
  }

  public getCamera(): BABYLON.Camera {
    if (!this.camera) {
      throw new Error("PointPickingController camera not set");
    }
    return this.camera;
  }

  // ─────────────────────────────────────────────
  // Setup simple click handler for PCS
  // ─────────────────────────────────────────────
  public setupPickingEvents(element: any, configs: any[], setData: (data: any[]) => void) {
    this.scene.onPointerObservable.add((pointerInfo) => handlePointerEvent(this, element, configs, setData, pointerInfo));
  }

  // ─────────────────────────────────────────────
  // Dispose
  // ─────────────────────────────────────────────
  public dispose() {
    this.scene.onPointerObservable.clear();
    PointPickingController._instance = null;
  }
}