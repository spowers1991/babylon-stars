import * as BABYLON from "babylonjs";
import type { MeshConfig } from "../../types/MeshConfig";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function createMesh(
  scene: BABYLON.Scene,
  config: MeshConfig,
): BABYLON.AbstractMesh {
  
  const assetsController = AssetsController.instance;

  const mesh = assetsController.meshes.getMesh(scene, config);

  return mesh;
}