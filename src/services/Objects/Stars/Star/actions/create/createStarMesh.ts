import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";
import type { MeshConfig } from "@/lib/Assets/modules/Meshes/Mesh/types/MeshConfig";
import type { StarConfig } from "../../types/StarConfig";

/**
 * Creates a Babylon.js sphere mesh for the star.
 */
export function createStarMesh(
  scene: BABYLON.Scene,
  config: StarConfig
): BABYLON.AbstractMesh {
  const assetsController = AssetsController.instance;

  const meshConfig = {
    id: String(config.id),
    type: config.meshType || "SphereMesh",
    name: `${config.name || "star"}_mesh`,
    options: {
      diameter: config.diameter || 1,
    },
  } as MeshConfig;
  
  return assetsController.meshes.create(scene, meshConfig);
}
