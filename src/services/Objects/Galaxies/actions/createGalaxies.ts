import * as BABYLON from "babylonjs";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import type { GalaxyConfig } from "@/services/Objects/Galaxies/Galaxy/types/GalaxyConfig";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";


export async function createGalaxies(scenes: BABYLON.Scene[], galaxiesConfigs: GalaxyConfig[]) {

  return Promise.all(galaxiesConfigs.map(config => (async () => {
    const galaxiesController = GalaxiesController.instance(scenes[0]);

    const galaxy = await Galaxy.create(scenes[0], {
      id: 1,
      name: config.name,
      starsData: config.starsData,
    });

    galaxiesController.add(galaxy);

    return galaxy;
  })()));
}