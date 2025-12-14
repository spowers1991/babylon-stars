import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";
import { StarConfig } from "./Star/types/StarConfig";
import { createStar } from "./Star/actions/createStar";
import { ParticlesController } from "@/lib/Particles/ParticlesController";

export class StarsController extends ObjectsController {
  public stars: Star[] = [];
  public starsConfigs: StarConfig[] = [];
  private starIds = new Set<number>();

  addConfig(data: StarConfig) {
    if (!this.starsConfigs.includes(data)) {
      this.starsConfigs.push(data);
    }
  }

   manageStars(
    scene: BABYLON.Scene,
    data: any,
    particlesController: ParticlesController
  ) {
    const newStars: Star[] = [];

    const particlesNearCamera = particlesController.cloudPointsToData(particlesController.particlesNearCamera, data);

    for (const { i } of particlesNearCamera) {
      // Skip if already created
      if (this.starIds.has(i)) continue;

      const cfg = this.starsConfigs.find(cfg => cfg.id === i);
      // if (!cfg) continue;

      const star = createStar(scene, cfg!);

      this.stars.push(star);
      this.starIds.add(i);
      newStars.push(star);
    }

    // Only update renderer if we actually added something
    if (newStars.length > 0) {
      this.updateRenderList(newStars);
    }

  }

  getAll() {
    return this.stars;
  }
}

