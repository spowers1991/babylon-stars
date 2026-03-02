import * as BABYLON from "babylonjs";

export function setFocusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3,
  speed = 2 // units per second
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  const scene = camera.getScene();
  const startTarget = camera.target.clone();
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

    if (lerpT >= 1) {
      scene.onBeforeRenderObservable.remove(observer);
    }
  });
}