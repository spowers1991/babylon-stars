import * as BABYLON from "babylonjs";

export function particlesToDataPCS(
  scene: BABYLON.Scene,
  particles: BABYLON.CloudPoint[],
  data: any[]
): any[] {
  const matchedObjects: any[] = [];
  particles?.forEach(particle => {
    const id = particle.idx
    const objectData = data.find((object: any) => object.i === id);

    if (!data) return;

    const obj = objectData as any;
    matchedObjects.push(obj);
  });

  return matchedObjects;
}
