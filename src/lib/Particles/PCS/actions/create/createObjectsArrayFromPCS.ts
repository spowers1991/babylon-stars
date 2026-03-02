import * as BABYLON from "babylonjs";

export function createObjectsArrayFromPCS(
  particles: BABYLON.CloudPoint[],
  configs: any[]
): any[] {

  const matchedConfigs: any[] = [];
  particles?.forEach(particle => {

    const id = particle.idx

    if(!configs) return;
    const objectData = configs.find((config: any) => config.id === id);

    if (!objectData) return;

    const obj = objectData as any;
    matchedConfigs.push(obj);
  });

  return matchedConfigs;
}
