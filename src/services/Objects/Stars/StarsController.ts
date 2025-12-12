import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";
import { StarConfig } from "./Star/types/StarConfig";
import { createStar } from "./Star/actions/createStar";

export class StarsController extends ObjectsController {
  public stars: Star[] = [];
  public starsConfigs: StarConfig[] = [];

  addConfig(data: StarConfig) {
    if (!this.starsConfigs.includes(data)) {
      this.starsConfigs.push(data);
    }
  }

  createStars(
    scene: BABYLON.Scene,
    particlesNearCamera: { i: number }[]
  ) {
    const newStars = particlesNearCamera
      .map(item => this.starsConfigs.find(cfg => cfg.id === item.i))
      .filter((cfg): cfg is StarConfig => cfg !== undefined)
      .map(cfg => createStar(scene, cfg));

    // Use the safe method from parent class
    this.updateRenderList(newStars);
  }

  add(gameObject: Star | Star[]) {
    const addOne = (obj: Star) => {
      if (!this.stars.includes(obj)) {
        this.stars.push(obj);
      }
      if (!this.objects.includes(obj)) {
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

