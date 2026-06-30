import * as BABYLON from "babylonjs";
import { getPointerEvents as ACTIONS_getPointerEvents } from "./_PickObject/@Actions/get/getPointerEvents";

export class PointPickingController {
  private static _instance: PointPickingController | null = null;

  private scene!: BABYLON.Scene;
  private camera?: BABYLON.Camera;
  public closestPickPCS?: BABYLON.CloudPoint | undefined;
  public closestPickSPS?: BABYLON.SolidParticle | undefined;
  
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
  public setPointerObservable({element, options, data, setActiveData}: {
    element: HTMLElement | any,
    options: { pickRadius: number },
    data: { configs: any[] },
    setActiveData: (configs: unknown[]) => void}) {
    this.scene.onPointerObservable.add((pointerInfo) => 
        ACTIONS_getPointerEvents(this.scene, element, options, data, setActiveData, pointerInfo)
    );
    console.log(this.closestPicksSPS)
  }

  // ─────────────────────────────────────────────
  // Dispose
  // ─────────────────────────────────────────────
  public dispose() {
    this.scene.onPointerObservable.clear();
    PointPickingController._instance = null;
  }
}