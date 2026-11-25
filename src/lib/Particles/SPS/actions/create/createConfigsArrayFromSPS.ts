import * as BABYLON from "babylonjs";
import { getParticleKeySPS } from "../get/getParticleKeySPS";

export function createConfigsArrayFromSPS<T extends { id?: number }>(
  particles: BABYLON.SolidParticle[],
  configs: T[]
): T[] {

  const matchedConfigs: T[] = [];
  const configsById = new Map<number | undefined, T>();
  for (const config of configs) {
    if (!configsById.has(config.id)) {
      configsById.set(config.id, config);
    }
  }

  particles?.forEach(particle => {
    const id = getParticleKeySPS(particle);
    const matchedConfig = configsById.get(id);

    if (!matchedConfig) return;
    matchedConfigs.push(matchedConfig);
  });

  return matchedConfigs;
}
