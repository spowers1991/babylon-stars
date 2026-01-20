import * as BABYLON from "babylonjs";

export function focusCamera(
  camera: BABYLON.Camera,
  targetPosition: BABYLON.Vector3,
  speed = 0.1 
) {
  if (!(camera instanceof BABYLON.ArcRotateCamera)) return;

  const scene = camera.getScene();
  const startTargetPosition = camera.position;

  let t = 0;

  const observer = scene.onBeforeRenderObservable.add(() => {
    t += speed;

    const lerpT = Math.min(t, 1);

    BABYLON.Vector3.LerpToRef(
      startTargetPosition,
      targetPosition,
      lerpT,
      camera.target
    );

    if (lerpT >= 1) {
      scene.onBeforeRenderObservable.remove(observer);
      //camera.setTarget(targetPosition);
    }
  });
}
