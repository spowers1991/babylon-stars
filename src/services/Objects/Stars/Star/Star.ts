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
      diameter = 30,
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

    // 1. Make sure mesh is added to the scene
    scene.addMesh(mesh);

    // 2. Detach from any parent
    mesh.parent = null;

    // 3. Reset scaling
    mesh.scaling = new BABYLON.Vector3(120, 120, 120); 

    // 4. Set position somewhere visible
    mesh.position = new BABYLON.Vector3(config.position?._x, config.position?._y, config.position?._z)

    // 5. Ensure mesh is enabled and visible
    mesh.setEnabled(true);
    mesh.isVisible = true;

    // 6. Force world matrix update
    mesh.computeWorldMatrix(true);

    // 7. Check
   // console.log(mesh.absoluteScaling);

    //mesh.setEnabled(false)

    //setupStarLighting(scene, name);

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
