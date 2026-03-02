import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import type { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export function renderSPS(scene: BABYLON.Scene) {

  const galaxy = GalaxiesController.instance(scene).galaxies[0];
  const particlesController = ParticlesController.instance(scene);

  return () => RenderersController.stepUpdate({
    id: "spsUpdate",
    name: "SPS Update",
    interval: 1000,
    step: () => {
      //console.log("Updating SPS with new star data...");
      particlesController.updateSPS(
        galaxy.sps as BABYLON.SolidParticleSystem,
        galaxy.starsData as StarData[]
      );
    },
  });
}
