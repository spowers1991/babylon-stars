import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import  { CamerasController } from "@/lib/Cameras/CamerasController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { SPSConfig } from "@/lib/Particles/SPS/types/SPSConfig";

export function renderCamera(scene: BABYLON.Scene) {
  const camerasController = CamerasController.instance(scene);
  const galaxiesController = GalaxiesController.instance(scene);
  const particlesController = ParticlesController.instance(scene);

  return () => RenderersController.stepUpdate({
    id: "cameraUpdate",
    name: "Camera Update",
    interval: 50,
    step: () => {
        const zoom = camerasController.getZoomLevelClamped(scene.activeCamera!);
        
        console.log(zoom)
        galaxiesController.galaxies.forEach(galaxy => {
            particlesController.updateSPS(
                galaxy.sps as BABYLON.SolidParticleSystem,
                galaxy.starsData as StarData[],
                { transparency: zoom } as SPSConfig
            );  
        });
    }
  });
}