import * as BABYLON from "babylonjs";
import { createSPS } from "@/lib/Particles/SPS/actions/create/createSPS";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import type { SPSConfig } from "@/lib/Particles/SPS/types/SPSConfig"
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export async function createGalaxySPS(
    scene: BABYLON.Scene,
    starsData: StarData[],
    name: string,
    options: SPSConfig = {}
) {

  // Just call createPointMap directly
  const sps = await createSPS(scene, starsData, name);

  // Add to particle controller
  ParticlesController.instance(scene).add(sps, name);

  return sps;
}
