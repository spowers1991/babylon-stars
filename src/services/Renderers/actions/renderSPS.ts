import { RenderersController } from "@/lib/Renderers/RenderersController";
import type { ParticlesController } from "@/lib/Particles/ParticlesController";
import type { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import * as BABYLON from "babylonjs";

export function renderSPS(particlesController: ParticlesController, milkyWay: Galaxy) {
  return () => RenderersController.stepUpdate({
    id: "spsUpdate",
    name: "SPS Update",
    interval: 1000,
    step: () => {
      console.log("Updating SPS with new star data...");
      particlesController.updateSPS(
        milkyWay.sps as BABYLON.SolidParticleSystem,
        milkyWay.starsData as StarData[]
      );
    },
  });
}
