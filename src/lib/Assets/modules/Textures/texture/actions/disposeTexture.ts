import * as BABYLON from "babylonjs";

export function disposeTexture(texture: BABYLON.Texture): void {
  if (texture) {
    texture.dispose();
  }
}
