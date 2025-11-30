import * as BABYLON from "babylonjs";
import { disposeTexture } from "./disposeTexture";

export function disposeTextureByIndex( textures: BABYLON.Texture[], index: number): void {
    const texture = textures[index];
    if (texture) {
        disposeTexture(texture);
        textures.splice(index, 1);
    }
}
