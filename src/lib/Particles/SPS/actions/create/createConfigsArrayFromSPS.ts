import * as BABYLON from "babylonjs";

export function createConfigsArrayFromSPS(
  particles: BABYLON.SolidParticle[],
  data: any[]
): any[] {

  const matchedConfigs: any[] = [];
  particles?.forEach(particle => {

    const id = particle.idx

    if(!data) return;
    const objectData = data.find((config: any) => config.id === id);

    if (!objectData) return;

    const obj = objectData as any;
    matchedConfigs.push(obj);
  });

  return matchedConfigs;
}
