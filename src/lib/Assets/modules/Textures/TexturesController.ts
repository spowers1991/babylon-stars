import * as BABYLON from "babylonjs";
import { addToTextures } from "./texture/actions/addToTextures";
import { disposeTexture } from "./texture/actions/disposeTexture";
import { disposeTextureByIndex } from "./texture/actions/disposeTextureByIndex";
import { applyTexture } from "./texture/actions/applyTexture";

export class TexturesController {
  public textures: BABYLON.Texture[] = [];

  public save(scene: BABYLON.Scene, url: string): void {
    addToTextures(scene, this.textures, url)
  }

  public apply(material: BABYLON.PBRMaterial | null, texture: BABYLON.Texture) {
    if (material && texture) {
      applyTexture(material, texture);
    }
  }

  public getAll(): BABYLON.Texture[] {
    return this.textures;
  }

  public disposeByIndex(index: number): void {
    disposeTextureByIndex(this.textures, index)
  }

  public disposeAll(): void {
    this.textures.forEach(tex => disposeTexture(tex));
    this.textures = [];
  }
}
