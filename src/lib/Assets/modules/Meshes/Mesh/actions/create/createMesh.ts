import * as BABYLON from "babylonjs";
import { createMeshByType } from "./createMeshByType";
import { MeshConfig } from "../../types/MeshConfig";

export function createMesh(
  scene: BABYLON.Scene,
  config: MeshConfig,
  meshPool: [MeshConfig['type'], BABYLON.AbstractMesh[]][]
): BABYLON.AbstractMesh {

  //createOrInstanceMeshByType(scene, config, meshPool);

  const mesh = createMeshByType(scene, config, meshPool);

  if (!mesh) {
    throw new Error(`Failed to create mesh of type: ${config.type}`);
  }

  return mesh;
}
