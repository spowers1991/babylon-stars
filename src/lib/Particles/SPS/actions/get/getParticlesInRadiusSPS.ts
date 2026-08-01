import * as BABYLON from "babylonjs";
import { ParticlesController } from "../../../ParticlesController";

/** Get all particles in all SPS within a radius */
export function getParticlesInRadiusSPS(controller: ParticlesController, center: BABYLON.Vector3, radius: number): BABYLON.SolidParticle[] {
  const result: BABYLON.SolidParticle[] = [];
  const r2 = radius * radius;

  for (const instance of controller.getAllSPS()) {
    const mesh = instance.mesh;
    const worldMatrix = mesh?.computeWorldMatrix(true);

    for (const p of instance.particles) {
      let particlePosition = p.position;

      if (worldMatrix) {
        particlePosition = BABYLON.Vector3.TransformCoordinates(p.position, worldMatrix);
      }

      if (BABYLON.Vector3.DistanceSquared(center, particlePosition) <= r2) {
        result.push(p);
      }
    }
  }

  return result;
}
