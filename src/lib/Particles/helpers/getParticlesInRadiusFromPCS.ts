import * as BABYLON from "babylonjs";
import { ParticlesController } from "../ParticlesController";

/** Get particles from a specific named PCS in a radius */
export function getParticlesInRadiusFromPCS(controller: ParticlesController, name: string, center: BABYLON.Vector3, radius: number): BABYLON.Particle[] {
  const pcs = controller.getByName(name);
  if (!pcs) return [];

  const result: BABYLON.Particle[] = [];
  const r2 = radius * radius;

  for (const p of pcs.particles as any[]) {
    if (BABYLON.Vector3.DistanceSquared(center, p.position) <= r2) {
      result.push(p);
    }
  }

  return result;
}