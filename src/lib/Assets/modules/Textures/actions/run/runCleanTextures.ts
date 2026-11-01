import * as BABYLON from "babylonjs";

export function runCleanTextures(
  scene: BABYLON.Scene,
  texturesPool: BABYLON.BaseTexture[],
  ownedTextures: WeakSet<BABYLON.BaseTexture>
): void {
  scene.textures.slice().forEach((texture) => {
    if (ownedTextures.has(texture) && !texturesPool.includes(texture)) {
      texture.dispose();
    }
  });
}
