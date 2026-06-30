import * as BABYLON from "babylonjs";

type SPSParticleWithSourceId = BABYLON.SolidParticle & {
  sourceStarId?: number;
};

export function createConfigsArrayFromSPS(
  particles: BABYLON.SolidParticle[],
  configs: any[]
): any[] {

  const matchedConfigs: any[] = [];
  particles?.forEach(particle => {
    const particleWithSourceId = particle as SPSParticleWithSourceId;
    const id = particleWithSourceId.sourceStarId ?? particle.idx;

    if(!configs) return;
    const matchedConfig = configs.find((config: any) => config.id === id);

    if (!matchedConfig) return;
    matchedConfigs.push(matchedConfig);
  });

  return matchedConfigs;
}
