import * as BABYLON from "babylonjs";
import { loadTexture } from "./loadTexture";

export function addToTextures(scene: BABYLON.Scene, textures : BABYLON.Texture[], url: string){
    const texture = loadTexture(scene, url);
    textures.push(loadTexture(scene, url));
    return texture;
}