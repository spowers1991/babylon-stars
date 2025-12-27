import * as BABYLON from "babylonjs";
import { createPCS } from "@/lib/Particles/PCS/actions/createPCS";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { StarData } from "../Star/types/StarData";

export async function createStarPointMap(
  scene: BABYLON.Scene,
  starsData: StarData[],
  name: string
) {
  // Filter out invalid stars
  //const validStars = starsData.filter(s => s.i != null && s.x != null && s.y != null && s.z != null);

  // Just call createPointMap directly
  const pcs = await createPCS(scene, starsData, name);

  // Add to particle controller
  ParticlesController.instance.add(pcs, name);

  return pcs;
}
