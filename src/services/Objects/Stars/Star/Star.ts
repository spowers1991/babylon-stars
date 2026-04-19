import * as BABYLON from "babylonjs";
import { StarConfig } from "./types/StarConfig";

import { createStarMesh } from "./actions/create/createStarMesh";
import { setStarSize } from "./actions/set/setStarSize";
import { createStarMaterial } from "./actions/create/createStarMaterial";
import { createStarTexture } from "./actions/create/createStarTexture";
import { createStarSurfaceShader } from "./actions/create/createSurfaceShader";

import { setEmissiveTexture } from "./actions/set/setEmissiveTexture";
import { setEmissiveColor } from "./actions/set/setEmissiveColor";
import { setMeshPosToParticlePos } from "./actions/set/setMeshPosToParticlesPos";

export class Star {
  public id?: number;
  public name?: string;
  public mesh?: BABYLON.AbstractMesh;
  public material?: BABYLON.Material;
  public texture?: BABYLON.Texture;

  constructor(scene: BABYLON.Scene, config: StarConfig) {
    
    this.id = config.id!;
    this.name = config.name!;

    this.mesh = createStarMesh(
      scene,
      this.name,
      setStarSize(config.diameter!)* 1.5,
    ) as BABYLON.AbstractMesh;
    
  
    //const textureUrl = "textures/stars/classes/g/texture1.jpg";
    const textureUrl = config.textureUrl!;

    this.texture = createStarTexture(
      scene, 
      this.name, 
      textureUrl!, 
    ) as BABYLON.Texture;

    const shaderMaterial = createStarSurfaceShader(
      scene,
      `${name}_starShader`,
      config.emissiveColor as BABYLON.Color3,
      config.emissiveIntensity
    );

    this.material = createStarMaterial(
      scene,
      this.name,
      this.mesh,
      config.emissiveColor!,
      config.emissiveIntensity!,
      shaderMaterial
    ) as BABYLON.Material;

    setEmissiveTexture(
      this.mesh!, 
      this.material!, 
      this.texture!
    );

    setEmissiveColor(
      this.mesh!,
      this.material!,
      new BABYLON.Color3(
        config.emissiveColor!.r * config.emissiveIntensity!, 
        config.emissiveColor!.g * config.emissiveIntensity!, 
        config.emissiveColor!.b * config.emissiveIntensity!)
    );

    setMeshPosToParticlePos(scene, this);

    // Turn mesh off until activated by default.
    this.mesh.setEnabled(false);
  }
}
