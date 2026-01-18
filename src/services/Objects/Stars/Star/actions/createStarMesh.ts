import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

/**
 * Creates a Babylon.js sphere mesh for the star.
 */
export function createStarMesh(
  scene: BABYLON.Scene,
  name: string,
  diameter: number
): BABYLON.Mesh {

  const assets = AssetsController.instance;

  return assets.meshes.create(scene, "sphere", name, { diameter, segments: 10 });
}
