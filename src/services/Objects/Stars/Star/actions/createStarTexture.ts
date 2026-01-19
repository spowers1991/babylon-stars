import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function createStarTexture(
  scene: BABYLON.Scene,
  name: string,
  textureUrl: string,
  assetsController: AssetsController,
): BABYLON.Texture {
  return assetsController.textures.save(scene, name, textureUrl);
}
