import * as BABYLON from "babylonjs";
import type { PointData } from "../types/PointData";
import { convertToPointData } from "./convertToPointData";

export async function createPCS(
  scene: BABYLON.Scene,
  data: any[],
  name: string
): Promise<BABYLON.PointsCloudSystem> {

  const pointData: PointData[] = convertToPointData(data);

  const pcs = new BABYLON.PointsCloudSystem(name, 1, scene);

  pcs.addPoints(
    pointData.length,
    (particle: BABYLON.Particle, i: number) => {
      const p = pointData[i];

      particle.position.set(p.x, p.y, p.z);
      
      const color = p.color
      particle.color = new BABYLON.Color4(
        color?.r ?? 1,
        color?.g ?? 1,
        color?.b ?? 1,
        1
      );
    }
  );

  const mesh = await pcs.buildMeshAsync();

  const material = new BABYLON.StandardMaterial(name, scene);
  material.pointsCloud = true;
  material.pointSize = 2;
  //material.disableLighting = true;
  material.emissiveColor = BABYLON.Color3.White();

  mesh.material = material;
  //mesh.hasVertexAlpha = true;

  return pcs;
}
