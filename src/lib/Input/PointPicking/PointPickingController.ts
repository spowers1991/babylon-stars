import * as BABYLON from "babylonjs";
import { pickMesh } from "./actions/pickMesh";
import { pickParticlePCS } from "./actions/pickParticlePCS";
import { focusCamera } from "@/lib/Cameras/Camera/actions/focusCamera";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { setNearbyStarsData } from "@/services/Objects/Stars/actions/setNearbyStarsData";
import { setPickingActions } from "./actions/setPickingActions";

export class PointPickingController {
  private static _instance: PointPickingController | null = null;

  private scene!: BABYLON.Scene;
  private camera?: BABYLON.Camera;

  public closestPicksPCS: BABYLON.CloudPoint[] = [];

  private constructor(scene: BABYLON.Scene) {
    this.scene = scene;
  }

  // ─────────────────────────────────────────────
  // Singleton access (scene only)
  // ─────────────────────────────────────────────
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

  private getCamera(): BABYLON.Camera {
    if (!this.camera) {
      throw new Error("PointPickingController camera not set");
    }
    return this.camera;
  }

  // ─────────────────────────────────────────────
  // Setup simple click handler for PCS
  // ─────────────────────────────────────────────
  public setupPickingEvents(object : any) {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

      console.log(object)
      const camera = this.getCamera();

     /* setPickingActions([
        () => setNearbyStarsData(this.scene, object),
      ]);*/

      
      const meshPick = pickMesh(this.scene, camera);
      if (meshPick?.pickedMesh) {
        focusCamera(camera, meshPick.pickedMesh.position);
        return;
      }

      const pcsPick = pickParticlePCS(this.scene, camera, object.pcs, 0.2);
      if (!pcsPick) return;

      this.closestPicksPCS =
        ParticlesController.instance(this.scene).getParticlesInRadiusPCS(
          pcsPick.position,
          5
        );

      focusCamera(camera, pcsPick.position);

    });
  }

  // ─────────────────────────────────────────────
  // Dispose
  // ─────────────────────────────────────────────
  public dispose() {
    this.scene.onPointerObservable.clear();
    PointPickingController._instance = null;
  }
}