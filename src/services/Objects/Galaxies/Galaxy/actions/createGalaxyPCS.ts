import * as BABYLON from "babylonjs";
import { createPCS } from "@/lib/Particles/PCS/actions/create/createPCS";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { StarData } from "../../../Stars/Star/types/StarData";

export async function createGalaxyPCS(
  scene: BABYLON.Scene,
  starsData: StarData[],
  name: string
) {

  // Just call createPointMap directly
  const pcs = await createPCS(scene, starsData, name);

  // Add to particle controller
  ParticlesController.instance(scene).add(pcs, name);

  return pcs;
}
