import * as BABYLON from "babylonjs";

export function getNearbyPCSParticles(
  scene: BABYLON.Scene,
  camera: BABYLON.Camera,
  particlesInstance: BABYLON.PointsCloudSystem,
  onPicked: (particles: BABYLON.CloudPoint[]) => void
) {
  const threshold = 5;
  const maxParticles = 10;

  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;
    if (!particlesInstance.particles || particlesInstance.particles.length === 0) return;

    const ray = scene.createPickingRay(
      pointerInfo.event.clientX,
      pointerInfo.event.clientY,
      BABYLON.Matrix.Identity(),
      camera
    );

    const rayOrigin = ray.origin;
    const rayDir = ray.direction;

    const candidates: { particle: BABYLON.CloudPoint; distanceAlongRay: number }[] = [];

    for (const particle of particlesInstance.particles) {
      const toParticle = particle.position.subtract(rayOrigin);
      const t = BABYLON.Vector3.Dot(toParticle, rayDir);
      if (t < 0) continue;

      const projected = rayOrigin.add(rayDir.scale(t));
      const distanceToRay = BABYLON.Vector3.Distance(projected, particle.position);

      if (distanceToRay <= threshold) {
        candidates.push({ particle, distanceAlongRay: t });
      }
    }

    const nearestParticles = candidates
      .sort((a, b) => a.distanceAlongRay - b.distanceAlongRay)
      .slice(0, maxParticles)
      .map(c => c.particle);

    onPicked(nearestParticles); // call the callback
  });
}
