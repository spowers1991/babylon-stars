import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import type { StarConfig } from "./Star/types/StarConfig";
import type { StarData } from "./Star/types/StarData";
import { Star } from "./Star/Star";
import { createStarsConfigs as ACTIONS_createStarsConfigs } from "./actions/create/createStarsConfigs";
import { updateStars as ACTIONS_updateStars } from "./actions/run/updateStars";

export class StarsController extends ObjectsController {
  private static _instance: StarsController | null = null;

  private scene!: BABYLON.Scene;
  public stars: Star[] = [];

  // The currently active star (e.g. closest to camera, or matched from point picking)
  public activeStar: Star | null = null;
  public activeStarConfig: StarConfig | null = null;

  // Stars currently active (e.g. closest to camera, or matched from point picking)
  public activeStarsConfigs: StarConfig[] = [];

  // All Stars Configs
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
    return ACTIONS_createStarsConfigs(starsData, this);
  }

  updateStars(
    activeStarsConfigs: StarConfig[],
  ) {
    ACTIONS_updateStars(this.scene, this, activeStarsConfigs);
  }

  getAllStars() {
    return this.activeStarsConfigs;
  }

  getAllStarsConfigs() {
    return this.starsConfigs;
  }
}