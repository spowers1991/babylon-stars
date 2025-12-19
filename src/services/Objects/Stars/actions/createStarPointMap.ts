import * as BABYLON from "babylonjs";
import { createPointMap } from "@/lib/Particles/actions/createPointMap";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { StarData } from "../Star/types/StarData";

export async function createStarPointMap(
  scene: BABYLON.Scene,
  starsData: StarData[],
  name: string
) {
  const validStars = starsData.filter(s => s.i != null && s.x != null && s.y != null && s.z != null);

  const pcs = await createPointMap(
    name,
    scene,
    validStars,
    (particle, starData) => {
      particle.position.set(starData.x!, starData.y!, starData.z!);

      (particle as any).diameter = (starData.p ?? 1) / 10;

      const color = starData.K ?? { r: 1, g: 1, b: 1 };
      (particle as any).color = new BABYLON.Color3(color.r, color.g, color.b);
    }
  );

  // Only add once fully built
  ParticlesController.instance.add(pcs, name);

  return pcs;
}
