import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import type { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import { SPSConfig } from "@/lib/Particles/SPS/types/SPSConfig";

export function renderSPS(scene: BABYLON.Scene) {

  const galaxy = GalaxiesController.instance(scene).galaxies[0];
  const particlesController = ParticlesController.instance(scene);
  const camerasController = CamerasController.instance(scene);

  return () => RenderersController.stepUpdate({
    id: "spsUpdate",
    name: "SPS Update",
    interval: 50,
    step: () => {
      const zoom = camerasController.getZoomLevelClamped(scene.activeCamera!);
  
      particlesController.updateSPS(
        galaxy.sps as BABYLON.SolidParticleSystem,
        galaxy.starsData as StarData[],
        { transparency: zoom } as SPSConfig
      );
    },
  });
}
