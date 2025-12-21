import * as BABYLON from "babylonjs";

export type PickCallback = (info: BABYLON.PickingInfo, evt: PointerEvent) => void;

export class PointPickingController {
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;

  private onPickDown?: PickCallback;
  private onPickMove?: PickCallback;
  private onPickUp?: PickCallback;

  constructor(scene: BABYLON.Scene, camera: BABYLON.Camera) {
    this.scene = scene;
    this.camera = camera;
    this.attach();
  }

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

  public onPointerDown(cb: PickCallback): void {
    this.onPickDown = cb;
  }

  public onPointerMove(cb: PickCallback): void {
    this.onPickMove = cb;
  }

  public onPointerUp(cb: PickCallback): void {
    this.onPickUp = cb;
  }

  public dispose(): void {
    this.scene.onPointerObservable.clear();
  }
}
