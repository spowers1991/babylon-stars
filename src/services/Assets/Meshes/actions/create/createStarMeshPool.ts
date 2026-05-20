import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";
import { MeshesController } from "@/lib/Assets/modules/Meshes/MeshesController";

export function createStarMeshPool(scene: BABYLON.Scene): void {
  const meshesController = AssetsController.instance.meshes as MeshesController;
  // meshesController.createMeshPool(scene, meshesController.meshes);
}