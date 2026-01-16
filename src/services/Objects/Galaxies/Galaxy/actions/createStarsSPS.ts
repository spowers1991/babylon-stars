import * as BABYLON from "babylonjs";
import { createSPS } from "@/lib/Particles/SPS/actions/createSPS";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import type { ParticleOptionsSPS } from "@/lib//Particles/SPS/types/ParticleOptionsSPS"
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export async function createStarsSPS(
  scene: BABYLON.Scene,
    starsData: StarData[],
    name: string,
    options: ParticleOptionsSPS = {}
) {

  // Just call createPointMap directly
  const sps = await createSPS(scene, starsData, name);

  // Add to particle controller
  ParticlesController.instance.add(sps, name);

  return sps;
}
