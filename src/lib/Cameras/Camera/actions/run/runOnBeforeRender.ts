import * as BABYLON from "babylonjs";

/**
 * Registers a per-frame callback on the scene; the observer removes itself once the callback returns true.
 */
export function runOnBeforeRender(scene: BABYLON.Scene, callback: () => boolean | void): void {
  const observer = scene.onBeforeRenderObservable.add(() => {
    const isDone = callback();

    if (isDone) {
      scene.onBeforeRenderObservable.remove(observer);
    }
  });
}
