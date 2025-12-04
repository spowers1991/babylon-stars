import * as BABYLON from "babylonjs";
import { ParticlesController } from "../ParticlesController";

/** Get all particles in all PCS within a radius */
export function getParticlesInRadius(controller: ParticlesController, center: BABYLON.Vector3, radius: number): BABYLON.Particle[] {
  const result: BABYLON.Particle[] = [];
  const r2 = radius * radius;
  for (const pcs of controller.getAllPCS()) {
    for (const p of pcs.particles) { // no cast
      if (BABYLON.Vector3.DistanceSquared(center, p.position) <= r2) {
        result.push(p as any);
      }
    }
  }

  return result;
}
