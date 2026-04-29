import * as BABYLON from "babylonjs";
import { createMeshByType } from "./createMeshByType";
import { MeshOptions } from "../../types/Mesh";
import { MeshType } from "../../types/Mesh";

export function createMesh(
  scene: BABYLON.Scene,
  meshType: MeshType,
  name: string,
  options: MeshOptions,
): BABYLON.Mesh {

  const mesh = createMeshByType(scene, meshType, name, options);

  return mesh;
}
