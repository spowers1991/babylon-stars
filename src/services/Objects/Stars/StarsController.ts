import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";
import { StarConfig } from "./Star/types/StarConfig";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { createStarsFromConfigs } from "./actions/createStarsFromConfigs";
import { StarData } from "./Star/types/StarData";

export class StarsController extends ObjectsController {
  public stars: Star[] = [];
  public starsConfigs: StarConfig[] = [];

  addConfig(data: StarConfig) {
    if (!this.starsConfigs.includes(data)) {
      this.starsConfigs.push(data);
    }
  }

  manageStars(
    scene: BABYLON.Scene,
    starData: StarData[],
    particlesController: ParticlesController
  ) {
    
    const nearbyStarsData = particlesController.cloudPointsToData(scene, particlesController.particlesNearCamera, starData);
    
    const stars = createStarsFromConfigs(scene, nearbyStarsData, this)

    if (stars.length > 0) {
      this.updateRenderList(stars);
      //console.log(particlesController.particlesNearCamera, stars)
    }

  }

  getAll() {
    return this.stars;
  }
}

