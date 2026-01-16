import * as BABYLON from "babylonjs";
import { pickMesh } from "./actions/pickMesh";
import { pickParticlePCS } from "./actions/pickParticlePCS";
import { focusCamera } from "@/lib/Cameras/Camera/actions/focusCamera";
import { ParticlesController } from "@/lib/Particles/ParticlesController";

export class PointPickingController {
  private static _instance: PointPickingController | null = null;

  private scene!: BABYLON.Scene;
  private camera!: BABYLON.Camera;
  public closePickPCS!: BABYLON.CloudPoint[]

  private constructor() {}

  // ─────────────────────────────────────────────
  // Singleton access
  // ─────────────────────────────────────────────
  public static getInstance(
    scene?: BABYLON.Scene,
    camera?: BABYLON.Camera
  ): PointPickingController {
    if (!PointPickingController._instance) {
      if (!scene || !camera) {
        throw new Error(
          "PointPickingController not initialized. Provide scene and camera on first call."
        );
      }

      const instance = new PointPickingController();
      instance.init(scene, camera);
      PointPickingController._instance = instance;
    }

    return PointPickingController._instance;
  }

  // ─────────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────────
  private init(scene: BABYLON.Scene, camera: BABYLON.Camera) {
    this.scene = scene;
    this.camera = camera;
  }

  // ─────────────────────────────────────────────
  // Setup simple click handler for PCS
  // ─────────────────────────────────────────────
  public setupPointerEvents(pcs: BABYLON.PointsCloudSystem) {
      this.scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;
        
       const meshPick = pickMesh(this.scene, this.camera);
        if (meshPick) {
          if (meshPick?.pickedMesh) focusCamera(this.camera, meshPick.pickedMesh?.position)
          //console.log("Picked mesh particle:", meshPick.pickedMesh);
        } else {
          const pcsPick = pickParticlePCS(this.scene, this.camera, pcs, 0.2);

          // Assuming particle.position is a BABYLON.Vector3
          if (pcsPick) focusCamera(this.camera, pcsPick.position)

          if (pcsPick) this.closePickPCS = ParticlesController.instance.getParticlesInRadiusPCS(pcsPick.position, 5)

          //if (pcsPick) this.closePickPCS = [pcsPick];

        }

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
