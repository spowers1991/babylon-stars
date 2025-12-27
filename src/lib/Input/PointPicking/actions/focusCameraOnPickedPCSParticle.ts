import * as BABYLON from "babylonjs";

export function focusCameraOnPickedPCSParticle(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  pcsInstance: BABYLON.PointsCloudSystem
) {
  const threshold = 0.9; // max distance from ray to particle to consider it "picked"

  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

    if (!pcsInstance.particles || pcsInstance.particles.length === 0) {
      console.warn("PCS has no particles. Make sure buildMesh() was called.");
      return;
    }

    const ray = scene.createPickingRay(
      pointerInfo.event.clientX,
      pointerInfo.event.clientY,
      BABYLON.Matrix.Identity(),
      camera
    );

    const rayOrigin = ray.origin;
    const rayDir = ray.direction;

    let closestParticle: BABYLON.CloudPoint | null = null;
    let closestDistanceAlongRay = Infinity;

    for (const particle of pcsInstance.particles) {
      const toParticle = particle.position.subtract(rayOrigin);
      const t = BABYLON.Vector3.Dot(toParticle, rayDir);
      if (t < 0) continue;

      const projected = rayOrigin.add(rayDir.scale(t));
      const distanceToRay = BABYLON.Vector3.Distance(projected, particle.position);

      if (distanceToRay <= threshold && t < closestDistanceAlongRay) {
        closestDistanceAlongRay = t;
        closestParticle = particle;
      }
    }

    if (!closestParticle) return;

    const targetPos = closestParticle.position.clone();

    // ArcRotateCamera: animate target and radius
    if (camera instanceof BABYLON.ArcRotateCamera) {
      // Animate target
      BABYLON.Animation.CreateAndStartAnimation(
        "cameraTargetAnim",
        camera,
        "target",
        60, // fps
        30, // duration in frames (~0.5 sec)
        camera.target.clone(),
        targetPos,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      // Animate radius
      BABYLON.Animation.CreateAndStartAnimation(
        "cameraRadiusAnim",
        camera,
        "radius",
        60,
        30,
        camera.radius,
        5, // desired zoom distance
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
    } else if (camera instanceof BABYLON.FreeCamera || camera instanceof BABYLON.UniversalCamera) {
      const desiredPos = targetPos.add(new BABYLON.Vector3(0, 0, -10));
      BABYLON.Animation.CreateAndStartAnimation(
        "cameraPosAnim",
        camera,
        "position",
        60,
        30,
        camera.position.clone(),
        desiredPos,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      camera.setTarget(targetPos);
    }
  });
}
