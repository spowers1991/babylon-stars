import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function createStarMeshPool(scene: BABYLON.Scene): void {
  const meshesController = AssetsController.instance.meshes;
  meshesController.createMeshPool(scene, meshesController.meshes);
}