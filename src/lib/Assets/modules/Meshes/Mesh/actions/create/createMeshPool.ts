import * as BABYLON from "babylonjs";
import { createMesh as ACTIONS_createMesh } from "./createMesh";
import { createMeshByType } from "./createMeshByType";
import { MeshConfig } from "../../types/MeshConfig";

export function createMeshPool(scene: BABYLON.Scene, meshes: BABYLON.Mesh[]): [MeshConfig['type'], BABYLON.Mesh[]][] {
  console.log('test');
  const meshTypes: MeshConfig['type'][] = ["SphereMesh", "BoxMesh", "CylinderMesh", "PlaneMesh"];
  const meshPoolArr: [MeshConfig['type'], BABYLON.Mesh[]][] = [];
  const totalMeshes = meshes.length;
  const perType = Math.floor(totalMeshes / meshTypes.length);
  let assigned = 0;

  for (let t = 0; t < meshTypes.length; t++) {
    const type = meshTypes[t];
    const count = t === meshTypes.length - 1 ? totalMeshes - assigned : perType;
    const pool: BABYLON.Mesh[] = [];
    for (let i = 0; i < count; i++) {
      const mesh = createMeshByType(scene, {
        type,
        name: `meshPool_${type}_${i}`,
        options: {
          width: 1,
          height: 1,
          depth: 1,
        },
      });
      pool.push(mesh as BABYLON.Mesh);
    }
    assigned += count;
    meshPoolArr.push([type, pool]);
  }
  return meshPoolArr;
};