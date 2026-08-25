import * as BABYLON from "babylonjs";

export function runPointerObservable(
  scene: BABYLON.Scene,
  callback: (pointerInfo: BABYLON.PointerInfo) => void
): void {
  scene.onPointerObservable.add(callback);
}
