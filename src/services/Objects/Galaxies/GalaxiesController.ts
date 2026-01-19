import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import type { Galaxy } from "./Galaxy/types/Galaxy";

export class GalaxiesController extends ObjectsController{
  public galaxies: Galaxy[] = [];

  private static _instance: GalaxiesController | null = null;
  
  private scene!: BABYLON.Scene;

  private constructor(scene: BABYLON.Scene) {
    super();
    this.scene = scene;
  }

  public static instance(scene?: BABYLON.Scene): GalaxiesController {
    if (!GalaxiesController._instance) {
      if (!scene) {
        throw new Error(
          "StarsController.instance(scene) must be called once with a BABYLON.Scene"
        );
      }
      GalaxiesController._instance = new GalaxiesController(scene);
    }
    return GalaxiesController._instance;
  }

  add(gameObject: Object | Object[]) {
    if (Array.isArray(gameObject)) {
      this.objects.push(...gameObject);
      this.galaxies.push(...gameObject);
    } else {
      this.objects.push(gameObject);
    }
  }

  getByName(name: string) {
    return this.galaxies[name as any];
  }

  getAll() {
    return this.galaxies;
  }
}
