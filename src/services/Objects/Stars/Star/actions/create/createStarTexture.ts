import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function createStarTexture(
  scene: BABYLON.Scene,
  name: string,
  textureUrl: string,
): BABYLON.Texture | undefined {
  if(!textureUrl) return;
  const assetsController = AssetsController.instance;
  return assetsController.textures.save(scene, name, textureUrl);
}
