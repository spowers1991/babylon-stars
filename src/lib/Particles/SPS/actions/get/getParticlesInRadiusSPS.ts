import * as BABYLON from "babylonjs";
import { ParticlesController } from "../../../ParticlesController";

/** Get all particles in all SPS within a radius */
export function getParticlesInRadiusSPS(controller: ParticlesController, center: BABYLON.Vector3, radius: number): BABYLON.SolidParticle[] {
  const result: { particle: BABYLON.SolidParticle; distanceSquared: number }[] = [];
  const r2 = radius * radius;

  for (const instance of controller.getAllSPS()) {
    const mesh = instance.mesh;
    const worldMatrix = mesh?.computeWorldMatrix(true);

    for (const p of instance.particles) {
      let particlePosition = p.position;

      if (worldMatrix) {
        particlePosition = BABYLON.Vector3.TransformCoordinates(p.position, worldMatrix);
      }

      const distanceSquared = BABYLON.Vector3.DistanceSquared(center, particlePosition);
      if (distanceSquared <= r2) {
        result.push({ particle: p, distanceSquared });
      }
    }
  }

  result.sort((a, b) => a.distanceSquared - b.distanceSquared);
  return result.map(({ particle }) => particle);
}
