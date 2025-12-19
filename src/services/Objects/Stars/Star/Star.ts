import * as BABYLON from "babylonjs";
import ObjectController from "@/lib/Objects/Object/ObjectController";
import { StarConfig } from "./types/StarConfig";

import { createStarMesh } from "./actions/createStarMesh";
import { createStarMaterial } from "./actions/createStarMaterial";
import { createStarTexture } from "./actions/createStarTexture";

import { setupStarLighting } from "./helpers/setupStarLighting";
import { attachDebugAxis } from "@/utils/attachDebugAxis"
import { ParticlesController } from "@/lib/Particles/ParticlesController";

export class Star extends ObjectController {
  constructor(scene: BABYLON.Scene, config: StarConfig) {
    const {
      id = 0,
      name = "star",
      diameter = 1,
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

    const particlesController = ParticlesController.instance.getByName('Milky Way')
    const particle = particlesController.particles.find(particle => particle.idx === id)
    const starPosition = particle?.position
    mesh.position = new BABYLON.Vector3(starPosition?._x, starPosition?._y, starPosition?._z)

    // 7. Check
    attachDebugAxis(mesh, 10);

    //setupStarLighting(scene, name);

    super({
      id,
      name,
      position: starPosition,
      mesh,
      material,
      texture,
    });
  }
}
