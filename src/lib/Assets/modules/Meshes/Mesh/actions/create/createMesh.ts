import * as BABYLON from "babylonjs";
import { createMeshByType } from "./createMeshByType";
import type { MeshConfig } from "../../types/MeshConfig";

export function createMesh(
  scene: BABYLON.Scene,
  config: MeshConfig,
): BABYLON.AbstractMesh {

  const mesh = createMeshByType(scene, config);
  
  return mesh;
}