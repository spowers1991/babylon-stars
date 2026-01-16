import * as BABYLON from "babylonjs";

export function focusCamera(
  camera: BABYLON.Camera,
  target: BABYLON.Vector3,
  speed = 0.1 // smaller = slower, smoother
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  const scene = camera.getScene();
  const startTarget = camera.target.clone();

  let t = 0;

  const observer = scene.onBeforeRenderObservable.add(() => {
    t += speed;

    // Clamp
    const lerpT = Math.min(t, 1);

    BABYLON.Vector3.LerpToRef(
      startTarget,
      target,
      lerpT,
      camera.target
    );

    // Stop when done
    if (lerpT >= 1) {
      scene.onBeforeRenderObservable.remove(observer);
      camera.setTarget(target); // final snap for precision
    }
  });
}
