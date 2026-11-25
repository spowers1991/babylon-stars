import * as BABYLON from "babylonjs";
import { addToTextures } from "./texture/actions/addToTextures";
import { disposeTexture } from "./texture/actions/disposeTexture";
import { disposeTextureByIndex } from "./texture/actions/disposeTextureByIndex";
import { applyTexture } from "./texture/actions/applyTexture";
import { runCleanTextures as ACTIONS_runCleanTextures } from "./actions/run/runCleanTextures";

export class TexturesController {
  public readonly texturesPool: BABYLON.Texture[] = [];
  public readonly ownedTextures = new WeakSet<BABYLON.BaseTexture>();

  /** @deprecated Use texturesPool. */
  public get textures(): BABYLON.Texture[] {
    return this.texturesPool;
  }

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

    const texture = addToTextures(scene, this.texturesPool, url);
    this.ownedTextures.add(texture);
    this.textureMap.set(name, texture);
    this.cleanUp(scene);

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
    return this.texturesPool;
  }

  /**
   * Dispose by index (keeps existing API working)
   */
  public disposeByIndex(index: number): void {
    const texture = this.texturesPool[index];
    if (!texture) return;

    // Remove from map
    for (const [key, value] of this.textureMap.entries()) {
      if (value === texture) {
        this.textureMap.delete(key);
        break;
      }
    }

    disposeTextureByIndex(this.texturesPool, index);
  }

  /**
   * Dispose by name (new)
   */
  public dispose(name: string): void {
    const texture = this.textureMap.get(name);
    if (!texture) return;

    disposeTexture(texture);

    const textureIndex = this.texturesPool.indexOf(texture);
    if (textureIndex !== -1) {
      this.texturesPool.splice(textureIndex, 1);
    }
    this.textureMap.delete(name);
  }

  public disposeAll(): void {
    this.texturesPool.forEach(tex => disposeTexture(tex));
    this.texturesPool.length = 0;
    this.textureMap.clear();
  }

  public cleanUp(scene: BABYLON.Scene): void {
    ACTIONS_runCleanTextures(scene, this.texturesPool, this.ownedTextures);
  }
}
