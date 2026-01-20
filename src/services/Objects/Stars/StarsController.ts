import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";
import { StarConfig } from "./Star/types/StarConfig";
import { createStarsFromConfigs } from "./actions/createStarsFromConfigs";
import { StarData } from "./Star/types/StarData";
import { createStarConfigs } from "./actions/createStarConfigs";

export class StarsController extends ObjectsController {
  private static _instance: StarsController | null = null;

  private scene!: BABYLON.Scene;

  public stars: Star[] = [];
  public starsConfigs: StarConfig[] = [];

  private constructor(scene: BABYLON.Scene) {
    super();
    this.scene = scene;
  }

  public static instance(scene?: BABYLON.Scene): StarsController {
    if (!StarsController._instance) {
      if (!scene) {
        throw new Error(
          "StarsController.instance(scene) must be called once with a BABYLON.Scene"
        );
      }
      StarsController._instance = new StarsController(scene);
    }
    return StarsController._instance;
  }

  addConfig(data: StarConfig) {
    if (!this.starsConfigs.includes(data)) {
      this.starsConfigs.push(data);
    }
  }

  createConfigs(starsData : StarData[]){
    createStarConfigs(starsData, this);
  }

  updateStars(
    starsData: StarData[],
  ) {
    const starsToRender = createStarsFromConfigs(this.scene, starsData, this);

    if (starsToRender.length > 0) {
      this.updateObjectToRender(starsToRender);
    }
  }

  getAllStars() {
    return this.stars;
  }

  getAllStarsConfigs() {
    return this.starsConfigs;
  }
}