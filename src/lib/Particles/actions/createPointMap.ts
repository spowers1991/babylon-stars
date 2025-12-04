import * as BABYLON from "babylonjs";

export interface PointInitializer<T> {
  (particle: BABYLON.Particle, item: T, index: number): void;
}

export async function createPointMap<T>(
  name: string,
  scene: BABYLON.Scene,
  data: T[],
  initFn: PointInitializer<T>
): Promise<BABYLON.PointsCloudSystem> {
  const pcs = new BABYLON.PointsCloudSystem(name, 1, scene);

  pcs.addPoints(data.length, (particle: BABYLON.Particle, index: number) => {
    initFn(particle, data[index], index);
  });

  await pcs.buildMeshAsync().then(mesh => {
    const material = new BABYLON.StandardMaterial(`${name}Mat`, scene);
    material.pointsCloud = true;
    material.pointSize = 10;
    material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    mesh.material = material;
  });

  return pcs;
}
