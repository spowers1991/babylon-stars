import * as BABYLON from "babylonjs";

export function pickParticlePCS(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  pcs: BABYLON.PointsCloudSystem,
  threshold = 0.2
): BABYLON.CloudPoint | null {
  const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);

  let closest: BABYLON.CloudPoint | null = null;
  let minDist = Infinity;

  pcs.particles.forEach((p) => {
    const toParticle = p.position.subtract(ray.origin);
    const proj = BABYLON.Vector3.Dot(toParticle, ray.direction);
    const closestPointOnRay = ray.origin.add(ray.direction.scale(proj));
    const distanceToRay = BABYLON.Vector3.Distance(closestPointOnRay, p.position);

    if (distanceToRay < threshold && distanceToRay < minDist) {
      closest = p;
      minDist = distanceToRay;
    }
  });

  return closest;
}
