import * as BABYLON from "babylonjs";

export function getPickParticleSPS(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  sps: BABYLON.SolidParticleSystem,
  pickRadius = 0.75,           // world units
  pickThreshold = 0.25,     // extra world-unit margin
): BABYLON.SolidParticle | null {

  const ray = scene.createPickingRay(
    scene.pointerX,
    scene.pointerY,
    BABYLON.Matrix.Identity(),
    camera
  );

  let closest: BABYLON.SolidParticle | null = null;
  const effectiveRadius = pickRadius + pickThreshold;
  let minDistSq = effectiveRadius * effectiveRadius;

  for (const p of sps.particles) {

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
