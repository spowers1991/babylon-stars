import * as BABYLON from "babylonjs";
import ObjectController from "@/lib/Objects/Object/ObjectController";
import { StarConfig } from "./types/StarConfig";

import { createStarMesh } from "./actions/createStarMesh";
import { createStarMaterial } from "./actions/createStarMaterial";
import { createStarTexture } from "./actions/createStarTexture";

import { setupStarLighting } from "./helpers/setupStarLighting";

export class Star extends ObjectController {
  constructor(scene: BABYLON.Scene, config: StarConfig) {
    const {
      id = 0,
      name = "star",
      position = new BABYLON.Vector3(0, 0, 0),
      diameter = 3,
      textureUrl = "/textures/stars/classes/g/texture1.jpg",
      emissiveColor = new BABYLON.Color3(0.8, 0.8, 1.0),
      emissiveIntensity = 1,
    } = config;

    const mesh = createStarMesh(scene, name, diameter) as BABYLON.Mesh;
    const texture = createStarTexture(scene, textureUrl) as BABYLON.Texture;
    const material = createStarMaterial(scene, name, texture, emissiveColor, emissiveIntensity) as BABYLON.StandardMaterial;

    if (mesh && material) {
      mesh.material = material;
    }

   if (material && texture) {
      material.bumpTexture = texture;
    }

    setupStarLighting(scene, name);

    super({
      id,
      name,
      position,
      mesh,
      material,
      texture,
    });
  }
}
