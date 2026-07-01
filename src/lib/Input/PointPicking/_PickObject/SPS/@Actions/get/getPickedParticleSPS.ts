import * as BABYLON from "babylonjs";

export function getPickParticleSPS(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  sps: BABYLON.SolidParticleSystem,
  pickRadius = 0.75,           // world units
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
    const particleRadius = Math.max(p.scaling.x, p.scaling.y, p.scaling.z) * 0.5;
    const effectiveRadius = Math.min(pickRadius, particleRadius);
    const particleMinDistSq = effectiveRadius * effectiveRadius;

    const toParticle = p.position.subtract(ray.origin);

    // ---- Optimization: ignore particles behind camera ----
    const proj = BABYLON.Vector3.Dot(toParticle, ray.direction);
    if (proj < 0) continue;

    const closestPointOnRay =
      ray.origin.add(ray.direction.scale(proj));

    const distSq =
      BABYLON.Vector3.DistanceSquared(closestPointOnRay, p.position);

    if (distSq < particleMinDistSq && distSq < minDistSq) {
      closest = p;
      minDistSq = particleMinDistSq;
    }
  }

  return closest;
}
