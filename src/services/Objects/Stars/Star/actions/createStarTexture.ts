import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function createStarTexture(
  scene: BABYLON.Scene,
  name: string,
  textureUrl: string,
): BABYLON.Texture {

  const assets = AssetsController.instance;
  return assets.textures.save(scene, name, textureUrl);
}
