import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

/**
 * Creates a Babylon.js sphere mesh for the star.
 */
export function createStarMesh(
  scene: BABYLON.Scene,
  name: string,
  diameter: number,
  assetsController: AssetsController,
): BABYLON.Mesh {

  return assetsController.meshes.create(scene, "sphere", name, { diameter, segments: 10 });
}
