import * as BABYLON from "babylonjs";

export function getPickedParticleSPS(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  sps: BABYLON.SolidParticleSystem,
  pickRadius = 1,           // world units
): BABYLON.SolidParticle | null {

  const ray = scene.createPickingRay(
    scene.pointerX,
    scene.pointerY,
    BABYLON.Matrix.Identity(),
    camera
  );

  let closest: BABYLON.SolidParticle | null = null;
  let minDistSq = pickRadius * pickRadius;

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
