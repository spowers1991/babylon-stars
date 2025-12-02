import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";

/**
 * Loads or creates a texture for the star.
 */
export function createStarTexture(
  scene: BABYLON.Scene,
  textureUrl: string,
): BABYLON.Texture {
  // Load via assets controller (for async caching, etc.)

  const assets = new AssetsController();
  assets.textures.save(scene, textureUrl);

  const texture = new BABYLON.Texture(textureUrl, scene);

  return texture;
}
