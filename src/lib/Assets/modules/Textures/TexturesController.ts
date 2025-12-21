import * as BABYLON from "babylonjs";
import { addToTextures } from "./texture/actions/addToTextures";
import { disposeTexture } from "./texture/actions/disposeTexture";
import { disposeTextureByIndex } from "./texture/actions/disposeTextureByIndex";
import { applyTexture } from "./texture/actions/applyTexture";

export class TexturesController {
  /** Ordered list (kept for backward compatibility) */
  public textures: BABYLON.Texture[] = [];

  /** Name → Texture lookup */
  private textureMap = new Map<string, BABYLON.Texture>();

  /**
   * Save or reuse a texture by name
   */
  public save(
    scene: BABYLON.Scene,
    name: string,
    url: string
  ): BABYLON.Texture {

    // Reuse if already exists
    const existing = this.textureMap.get(name);
    if (existing) {
      return existing;
    }

    addToTextures(scene, this.textures, url);

    const texture = this.textures[this.textures.length - 1];
    this.textureMap.set(name, texture);

    return texture;
  }

  /**
   * Get a texture by name
   */
  public get(name: string): BABYLON.Texture | undefined {
    return this.textureMap.get(name);
  }

  public apply(
    material: BABYLON.PBRMaterial | null,
    texture: BABYLON.Texture
  ): void {
    if (material && texture) {
      applyTexture(material, texture);
    }
  }

  public getAll(): BABYLON.Texture[] {
    return this.textures;
  }

  /**
   * Dispose by index (keeps existing API working)
   */
  public disposeByIndex(index: number): void {
    const texture = this.textures[index];
    if (!texture) return;

    // Remove from map
    for (const [key, value] of this.textureMap.entries()) {
      if (value === texture) {
        this.textureMap.delete(key);
        break;
      }
    }

    disposeTextureByIndex(this.textures, index);
  }

  /**
   * Dispose by name (new)
   */
  public dispose(name: string): void {
    const texture = this.textureMap.get(name);
    if (!texture) return;

    disposeTexture(texture);

    this.textures = this.textures.filter(t => t !== texture);
    this.textureMap.delete(name);
  }

  public disposeAll(): void {
    this.textures.forEach(tex => disposeTexture(tex));
    this.textures = [];
    this.textureMap.clear();
  }
}
