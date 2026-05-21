import * as BABYLON from "babylonjs";

export function createConfigsArrayFromSPS(
  particles: BABYLON.SolidParticle[],
  configs: any[]
): any[] {

  const matchedConfigs: any[] = [];
  particles?.forEach(particle => {

    const id = particle.idx

    if(!configs) return;
    const matchedConfig = configs.find((config: any) => config.id === id);

    if (!matchedConfig) return;
    matchedConfigs.push(matchedConfig);
  });

  return matchedConfigs;
}
