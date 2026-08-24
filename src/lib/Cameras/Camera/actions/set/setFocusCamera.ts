import * as BABYLON from "babylonjs";

export interface FocusCameraOptions {
  preventZoomOut?: boolean;
}

export function setFocusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3,
  speed = 2, // units per second
  options?: FocusCameraOptions
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  const scene = camera.getScene();
  const startTarget = camera.target.clone();
  const startRadius = camera.radius;
  const startPosition = camera.globalPosition.clone();
  const preventZoomOut =
    options?.preventZoomOut ?? camera.metadata?.focus?.preventZoomOut === true;
  const targetRadius = preventZoomOut
    ? Math.min(startRadius, BABYLON.Vector3.Distance(startPosition, targetPosition))
    : startRadius;
  let t = 0;

  const observer = scene.onBeforeRenderObservable.add(() => {
    const dt = scene.getEngine().getDeltaTime() / 1000;
    t += dt * speed;

    const lerpT = Math.min(t, 1);

    BABYLON.Vector3.LerpToRef(
      startTarget,
      targetPosition,
      lerpT,
      camera.target
    );

    if (preventZoomOut) {
      camera.radius = BABYLON.Scalar.Lerp(startRadius, targetRadius, lerpT);
    }

    if (lerpT >= 1) {
      scene.onBeforeRenderObservable.remove(observer);
    }
  });
}