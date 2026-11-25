import * as BABYLON from "babylonjs";

export type SPSParticleWithSourceId = BABYLON.SolidParticle & {
  sourceStarId?: number;
};

export function getParticleKeySPS(particle: BABYLON.SolidParticle): number {
  return (particle as SPSParticleWithSourceId).sourceStarId ?? particle.idx;
}
