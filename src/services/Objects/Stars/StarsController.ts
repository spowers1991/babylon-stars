import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import type { StarConfig } from "./Star/types/StarConfig";
import { createStarsConfigs } from "./actions/create/createStarsConfigs";
import type { StarData } from "./Star/types/StarData";
import { createStars } from "./actions/create/createStars";
import { Star } from "./Star/Star";

export class StarsController extends ObjectsController {
  private static _instance: StarsController | null = null;

  private scene!: BABYLON.Scene;

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
    return createStarsConfigs(starsData, this);
  }

  updateStars(
    activeStarsConfigs: StarConfig[],
  ) {
    
    // Create meshes for active stars configs
    const starsToRender = createStars(this.scene, activeStarsConfigs);

    // Closest star to camera becomes active star
    this.activeStar = starsToRender[0];
    this.activeStarConfig = activeStarsConfigs[0];

    // Update objects to render (which will trigger rendering in the next render loop)
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