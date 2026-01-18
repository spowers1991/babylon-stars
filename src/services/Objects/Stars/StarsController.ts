import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";
import { StarConfig } from "./Star/types/StarConfig";
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

  updateStars(
    scene: BABYLON.Scene,
    starsData: StarData[],
  ) {
    
    const stars = createStarsFromConfigs(scene, starsData, this)

    if (stars.length > 0) {
      this.updateObjectToRender(stars);
    }

  }

  getAllStars() {
    return this.stars;
  }

  getAllStarsConfigs() {
    return this.starsConfigs;
  }
}

