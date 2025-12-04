import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";
import { StarConfig } from "./Star/types/StarConfig";
import { createStar } from "./Star/actions/createStar";

export class StarsController extends ObjectsController {
  public stars: Star[] = [];
  public starsConfigs: StarConfig[]= [];

  addConfig(data: StarConfig){
      if (!this.starsConfigs.includes(data)) {   // optional: enforce unique in base array too
        this.starsConfigs.push(data);
      }
  }

  createStars(
    scene: BABYLON.Scene, 
    particlesNearCamera: { i: number }[]
  ) {
    // Clear previous objects
    this.objectsToRender = particlesNearCamera
      .map(item => this.starsConfigs.find(cfg => cfg.id === item.i))
      .filter((cfg): cfg is StarConfig => cfg !== undefined) // remove undefined
      .map(cfg => createStar(scene, cfg));                  // create new stars

  }

  add(gameObject: Star | Star[]) {

    const addOne = (obj: Star) => {
      if (!this.stars.includes(obj)) {     // <-- prevents duplicates
        this.stars.push(obj);
      }
      if (!this.objects.includes(obj)) {   // optional: enforce unique in base array too
        this.objects.push(obj);
      }
    };

    if (Array.isArray(gameObject)) {
      gameObject.forEach(addOne);
    } else {
      addOne(gameObject);
    }
  }

  getAll() {
    return this.stars;
  }
}
