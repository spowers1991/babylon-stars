import * as BABYLON from "babylonjs";
import { StarConfig } from "./types/StarConfig";

import { createStarMesh } from "./actions/createStarMesh";
import { createStarMaterial } from "./actions/createStarMaterial";
import { createStarTexture } from "./actions/createStarTexture";

import { findParticle } from "@/lib/Particles/helpers/findParticle";
import { moveToParticle } from "@/lib/Assets/modules/Meshes/Mesh/actions/moveToPosition";

export class Star {
  public id: number;
  public name: string;
  public mesh: BABYLON.Mesh;
  public material: BABYLON.Material;
  public texture: BABYLON.Texture;
  constructor(scene: BABYLON.Scene, config: StarConfig) {
    
    this.id = config.id!;
    this.name = config.name!;

    this.mesh = createStarMesh(scene, this.name, 0.1) as BABYLON.Mesh;
    
    const textureUrl = config.textureUrl!;
    this.texture = createStarTexture(scene, this.name, textureUrl!) as BABYLON.Texture;
//    console.log(this.texture)
    this.material = createStarMaterial(
      scene,
      this.name,
      this.mesh,
      config.emissiveColor!,
      config.emissiveIntensity!
    ) as BABYLON.Material;

    const particle = findParticle('Milky Way', this.id);
    moveToParticle(this.mesh, particle?.position);    
  }
}
