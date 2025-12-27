import * as BABYLON from "babylonjs";
import { focusCameraOnPickedMesh } from './actions/focusCameraOnPickedMesh';
import { focusCameraOnPickedSPSParticle } from "./actions/focusCameraOnPickedSPSParticle";
import { focusCameraOnPickedPCSParticle } from "./actions/focusCameraOnPickedPCSParticle";
import { getNearbySPSParticles } from "./actions/getNearbySPSParticles";
import { getNearbyPCSParticles } from "./actions/getNearbyPCSParticles";

export type PickCallback = (info: BABYLON.PickingInfo, evt: PointerEvent) => void;

export class PointPickingController {
  private static _instance: PointPickingController | null = null;

  private scene!: BABYLON.Scene;
  private camera!: BABYLON.Camera;
  public SPSParticlesNearClick: BABYLON.SolidParticle[] = [];
  public PCSParticlesNearClick: BABYLON.CloudPoint[] = [];

  private onPickDown?: PickCallback;
  private onPickMove?: PickCallback;
  private onPickUp?: PickCallback;

  // ─────────────────────────────────────────────
  // Private constructor prevents direct instantiation
  // ─────────────────────────────────────────────
  private constructor() {}

  // ─────────────────────────────────────────────
  // Singleton access
  // ─────────────────────────────────────────────
  public static getInstance(scene?: BABYLON.Scene, camera?: BABYLON.Camera): PointPickingController {
    if (!PointPickingController._instance) {
      if (!scene || !camera) {
        throw new Error("PointPickingController not initialized. Provide scene and camera on first call.");
      }
      const instance = new PointPickingController();
      instance.init(scene, camera);
      PointPickingController._instance = instance;
    }
    return PointPickingController._instance;
  }

  private init(scene: BABYLON.Scene, camera: BABYLON.Camera) {
    this.scene = scene;
    this.camera = camera;

    // Prevent browser right-click menu
    const canvas = this.scene.getEngine().getRenderingCanvas();
    if (canvas) {
      canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    this.attach();
  }

  // ─────────────────────────────────────────────
  // Event handling
  // ─────────────────────────────────────────────
  private attach(): void {
    this.scene.onPointerObservable.add((pointerInfo) => {
      const evt = pointerInfo.event as PointerEvent;

      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          this.handlePick(evt, this.onPickDown);
          break;

        case BABYLON.PointerEventTypes.POINTERMOVE:
          this.handlePick(evt, this.onPickMove);
          break;

        case BABYLON.PointerEventTypes.POINTERUP:
          this.handlePick(evt, this.onPickUp);
          break;
      }
    });
  }

  private handlePick(evt: PointerEvent, callback?: PickCallback) {
    if (!callback) return;

    const pickInfo = this.scene.pick(
      this.scene.pointerX,
      this.scene.pointerY,
      undefined,
      false,
      this.camera
    );

    if (pickInfo) {
      callback(pickInfo, evt);
    }
  }

  // ─────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────
  public onPointerDown(cb: PickCallback): void { this.onPickDown = cb; }
  public onPointerMove(cb: PickCallback): void { this.onPickMove = cb; }
  public onPointerUp(cb: PickCallback): void { this.onPickUp = cb; }

  // ─────────────────────────────────────────────
  // Helper: pick & focus camera
  // ─────────────────────────────────────────────
  public setupClickEvents(
    scene: BABYLON.Scene,
    camera: BABYLON.Camera,
    pcsInstance: BABYLON.PointsCloudSystem,
  ) {
    let isPointerDown = false;

    this.onPointerDown((pickInfo, evt) => {
      isPointerDown = true;
/*
      getNearbySPSParticles(scene, camera, particles, (nearbyParticles) => {
        this.SPSParticlesNearClick = nearbyParticles as BABYLON.SolidParticle[];
      });
*/
      //focusCameraOnPickedSPSParticle(scene, camera, particles);

      getNearbyPCSParticles(scene, camera, pcsInstance, (nearbyParticles) => {
        this.PCSParticlesNearClick = nearbyParticles as BABYLON.CloudPoint[];
      });

      focusCameraOnPickedPCSParticle(scene, camera, pcsInstance);
    });

    this.onPointerMove((pickInfo, evt) => {
      if (!isPointerDown) return;

      // Optional: drag logic / hover logic
      // console.log("Dragging over", pickInfo.pickedMesh);
    });

    this.onPointerUp((pickInfo, evt) => {
      isPointerDown = false;
      // Optional: release logic
    });
  }

  public dispose(): void {
    this.scene.onPointerObservable.clear();
    PointPickingController._instance = null;
  }
}
