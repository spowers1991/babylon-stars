import * as BABYLON from "babylonjs";

const FOCUS_TRANSITION_DURATION_SECONDS = 0.25;

export function setFocusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  const scene = camera.getScene();
  const startTarget = camera.target.clone();
  const nextTarget = targetPosition.clone();
  const metadata = (camera.metadata ??= {});

  if (metadata.focusObserver) {
    scene.onBeforeRenderObservable.remove(metadata.focusObserver);
    metadata.focusObserver = null;
  }

  if (startTarget.equalsWithEpsilon(nextTarget)) {
    camera.focusOn({
      min: nextTarget,
      max: nextTarget,
      distance: 0,
    }, true);
    return;
  }

  let elapsedSeconds = 0;

  metadata.focusObserver = scene.onBeforeRenderObservable.add(() => {
    elapsedSeconds += scene.getEngine().getDeltaTime() / 1000;
    const progress = Math.min(elapsedSeconds / FOCUS_TRANSITION_DURATION_SECONDS, 1);
    const currentTarget = BABYLON.Vector3.Lerp(startTarget, nextTarget, progress);

    camera.focusOn({
      min: currentTarget,
      max: currentTarget,
      distance: 0,
    }, true);

    if (progress >= 1) {
      scene.onBeforeRenderObservable.remove(metadata.focusObserver);
      metadata.focusObserver = null;
    }
  });
}