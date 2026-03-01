import * as BABYLON from "babylonjs";

export function createObjectArrayFromPCS(
  particles: BABYLON.CloudPoint[],
  data: any[]
): any[] {
  const matchedObjects: any[] = [];
  particles?.forEach(particle => {
    const id = particle.idx
    const objectData = data.find((object: any) => object.i === id);

    if (!objectData) return;

    const obj = objectData as any;
    matchedObjects.push(obj);
  });

  return matchedObjects;
}
