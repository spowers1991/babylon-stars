import * as BABYLON from "babylonjs";
import { ParticlesController } from "../../ParticlesController";

/** Get all particles in all PCS within a radius */
export function getParticlesInRadiusSPS(controller: ParticlesController, center: BABYLON.Vector3, radius: number): BABYLON.SolidParticle[] {
  const result: BABYLON.SolidParticle[] = [];
  const r2 = radius * radius;
  for (const instance of controller.getAllSystems()) {
    for (const p of instance.particles) { // no cast
      if (BABYLON.Vector3.DistanceSquared(center, p.position) <= r2) {
        result.push(p as any);
      }
    }
  }

  return result;
}
