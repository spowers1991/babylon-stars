import * as BABYLON from "babylonjs";

export function getPickedParticlePCS(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  pcs: BABYLON.PointsCloudSystem,
  pickRadius = 0.2,           // world units
): BABYLON.CloudPoint | null {

  const ray = scene.createPickingRay(
    scene.pointerX,
    scene.pointerY,
    BABYLON.Matrix.Identity(),
    camera
  );

  let closest: BABYLON.CloudPoint | null = null;
  let minDistSq = pickRadius * pickRadius;

  for (const p of pcs.particles) {

    const toParticle = p.position.subtract(ray.origin);

    // ---- Optimization: ignore particles behind camera ----
    const proj = BABYLON.Vector3.Dot(toParticle, ray.direction);
    if (proj < 0) continue;

    const closestPointOnRay =
      ray.origin.add(ray.direction.scale(proj));

    const distSq =
      BABYLON.Vector3.DistanceSquared(closestPointOnRay, p.position);

    if (distSq < minDistSq) {
      closest = p;
      minDistSq = distSq;
    }
  }

  return closest;
}
