import * as BABYLON from "babylonjs";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import type { GalaxyConfig } from "@/services/Objects/Galaxies/Galaxy/types/GalaxyConfig";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";

export async function createGalaxies(scene: BABYLON.Scene, galaxiesConfigs: GalaxyConfig[]) {

  return Promise.all(galaxiesConfigs.map(config => (async () => {
    const galaxiesController = GalaxiesController.instance(scene);

    const galaxy = await Galaxy.create(scene, {
      id: 1,
      name: config.name,
      starsData: config.starsData,
    });

    galaxiesController.add(galaxy);

    return galaxy;
  })()));
}