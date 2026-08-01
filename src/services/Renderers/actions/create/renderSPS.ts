import * as BABYLON from "babylonjs";
import type { SPSConfig } from "@/lib/Particles/SPS/types/SPSConfig";
import type { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function renderSPS(scene: BABYLON.Scene) {

  const galaxy = GalaxiesController.instance(scene).galaxies[0];
  const particlesController = ParticlesController.instance(scene);
  const camerasController = CamerasController.instance(scene);
  const starsController = StarsController.instance(scene);


  return () => RenderersController.stepUpdate({
    id: "spsUpdate",
    name: "SPS Update",
    interval: 50,
    step: () => {
      const distanceFactor = starsController.activeStar?.mesh
        ? camerasController.getDistanceToMeshClamped(starsController.activeStar.mesh, scene.activeCamera!, {
            minDistance: 0.1,
            maxDistance: 100,
          })
        : null;

      particlesController.setSPS(
        galaxy.sps as BABYLON.SolidParticleSystem,
        galaxy.starsData as StarData[],
        { transparency: distanceFactor ? distanceFactor : 1 } as SPSConfig
      );
      /*
      const nearbyParticles = particlesController.getParticlesInRadiusSPS(
        scene.activeCamera!.position,
        150
      );
      
      const nearbyConfigs = particlesController.createConfigsArrayFromSPS(
        nearbyParticles,
        galaxy.starsConfigs,
      );

      starsController.activeStarsConfigs = nearbyConfigs;
      
      starsController.activeObject = starsController.activeStarsConfigs[0] || null;
      
      const meshesController = AssetsController.instance.meshes;
      meshesController.setMeshesConfigs(starsController.activeStarsConfigs);
      meshesController.setMeshPool(scene);
*/
    

    },
  });
}
