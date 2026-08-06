import * as BABYLON from "babylonjs";

export function getPickParticleSPS(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  sps: BABYLON.SolidParticleSystem,
  pickRadius = 0.75, // baseline world-space hit radius
): BABYLON.SolidParticle | null {

  const ray = scene.createPickingRay(
    scene.pointerX,
    scene.pointerY,
    BABYLON.Matrix.Identity(),
    camera
  );

  let closest: BABYLON.SolidParticle | null = null;
  let closestDistSq = Number.POSITIVE_INFINITY;
  const worldMatrix = sps.mesh?.computeWorldMatrix(true);

  for (const p of sps.particles) {
    const worldPos = worldMatrix
      ? BABYLON.Vector3.TransformCoordinates(p.position, worldMatrix)
      : p.position;

    const particleRadius = Math.max(p.scaling.x, p.scaling.y, p.scaling.z) * 0.5;

    const toParticle = worldPos.subtract(ray.origin);

    // ---- Optimization: ignore particles behind camera ----
    const proj = BABYLON.Vector3.Dot(toParticle, ray.direction);
    if (proj < 0) continue;

    const closestPointOnRay =
      ray.origin.add(ray.direction.scale(proj));

    const distSq =
      BABYLON.Vector3.DistanceSquared(closestPointOnRay, worldPos);

    // Keep picking stable at different zoom levels and star sizes.
    const distanceFromCamera = Math.sqrt(toParticle.lengthSquared());
    const distanceScaledRadius = distanceFromCamera * 0.003;
    const effectiveRadius = Math.max(
      pickRadius,
      1.5,
      particleRadius * 1.5,
      distanceScaledRadius,
    );
    const thresholdSq = effectiveRadius * effectiveRadius;

    if (distSq <= thresholdSq && distSq < closestDistSq) {
      closest = p;
      closestDistSq = distSq;
    }
  }

  return closest;
}
