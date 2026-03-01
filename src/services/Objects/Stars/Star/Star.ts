import * as BABYLON from "babylonjs";
import { StarConfig } from "./types/StarConfig";

import { createStarMesh } from "./actions/createStarMesh";
import { createStarMaterial } from "./actions/createStarMaterial";
import { createStarTexture } from "./actions/createStarTexture";

import { getParticleSPS } from "@/lib/Particles/SPS/actions/get/getParticleSPS";
import { getParticlePCS } from "@/lib/Particles/PCS/actions/get/getParticlePCS";
import { moveToParticle } from "@/lib/Assets/modules/Meshes/Mesh/actions/moveToPosition";

export class Star {
  public id: number;
  public name: string;
  public mesh: BABYLON.AbstractMesh;
  public material: BABYLON.Material;
  public texture: BABYLON.Texture;

  constructor(scene: BABYLON.Scene, config: StarConfig) {
    
    this.id = config.id!;
    this.name = config.name!;

    this.mesh = createStarMesh(
      scene, 
      this.name, 
      ((config.diameter! < 0.1) ? 0.1 : config.diameter! / 5000), 
    ) as BABYLON.AbstractMesh;
    
    const textureUrl = config.textureUrl!;

    this.texture = createStarTexture(
      scene, 
      this.name, 
      textureUrl!, 
    ) as BABYLON.Texture;

    this.material = createStarMaterial(
      scene,
      this.name,
      this.mesh,
      config.emissiveColor!,
      config.emissiveIntensity!,
    ) as BABYLON.Material;

    const particlePCS = getParticlePCS(
      scene,
      'Milky Way PCS',
      this.id
    );

    const particleSPS = getParticleSPS(
      scene,
      'Milky Way SPS',
      this.id
    );

    const particle = particleSPS ? particleSPS : particlePCS

    moveToParticle(
      this.mesh, 
      particle?.position
    ); 
    
    this.mesh.setEnabled(false);
  }
}
