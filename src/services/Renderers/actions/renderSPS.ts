import { RenderersController } from "@/lib/Renderers/RenderersController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import * as BABYLON from "babylonjs";

export function renderSPS(scene: BABYLON.Scene, galaxy: Galaxy) {
  console.log(scene, galaxy);

  const particlesController = ParticlesController.instance(galaxy.scene);

  return () => RenderersController.stepUpdate({
    id: "spsUpdate",
    name: "SPS Update",
    interval: 1000,
    step: () => {
      console.log("Updating SPS with new star data...");
      particlesController.updateSPS(
        galaxy.sps as BABYLON.SolidParticleSystem,
        galaxy.starsData as StarData[]
      );
    },
  });
}
