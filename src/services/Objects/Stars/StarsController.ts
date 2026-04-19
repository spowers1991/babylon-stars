import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import type { StarConfig } from "./Star/types/StarConfig";
import { createStarsConfigs } from "./actions/create/createStarsConfigs";
import type { StarData } from "./Star/types/StarData";
import { createStars } from "./actions/create/createStars";

export class StarsController extends ObjectsController {
  private static _instance: StarsController | null = null;

  private scene!: BABYLON.Scene;

  public activeStarsConfigs: StarConfig[] = [];
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
    return createStarsConfigs(starsData, this);
  }

  updateStars(
    activeStarsConfigs: StarConfig[],
  ) {

    const starsToRender = createStars(this.scene, activeStarsConfigs);

    if (starsToRender.length > 0) {
      this.updateObjectsToRender(starsToRender);
    }
  }

  getAllStars() {
    return this.activeStarsConfigs;
  }

  getAllStarsConfigs() {
    return this.starsConfigs;
  }
}