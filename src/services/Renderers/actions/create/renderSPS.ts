import * as BABYLON from "babylonjs";
import type { SPSConfig } from "@/lib/Particles/SPS/types/SPSConfig";
import type { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import { StarsController } from "@/services/Objects/Stars/StarsController";

export function renderSPS(scene: BABYLON.Scene) {

  const galaxy = GalaxiesController.instance(scene).galaxies[0];
  const particlesController = ParticlesController.instance(scene);
  const camerasController = CamerasController.instance(scene);
  const starsController = StarsController.instance(scene);


  return (deltaMs: number) => RenderersController.stepUpdate({
    id: "spsUpdate",
    name: "SPS Update",
    interval: 50,
    step: () => {
      const distanceFactor = starsController.activeStar?.mesh
        ? camerasController.getActiveCamera()?.getDistanceToMeshClamped(starsController.activeStar.mesh, {
            minDistance: 0.1,
            maxDistance: 100,
          }) ?? null
        : null;

      particlesController.setSPS(
        galaxy.sps as BABYLON.SolidParticleSystem,
        galaxy.starsData as StarData[],
        { transparency: distanceFactor ? distanceFactor : 1 } as SPSConfig
      );

    },
  }, deltaMs);
}
