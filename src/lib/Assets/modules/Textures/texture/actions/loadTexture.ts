import * as BABYLON from "babylonjs";

export function loadTexture(
  scene: BABYLON.Scene,
  url: string
): BABYLON.Texture {
  return new BABYLON.Texture(url, scene);
}
