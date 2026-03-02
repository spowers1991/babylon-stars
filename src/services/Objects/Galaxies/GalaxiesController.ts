import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Galaxy } from "./Galaxy/Galaxy";

export class GalaxiesController extends ObjectsController{
  public galaxies: Galaxy[] = [];
  public galaxiesConfigs: any[] = [];

  add(galaxy: Galaxy | Galaxy[]) {
    const addOne = (g: Galaxy) => {
      if (!this.galaxies.includes(g)) {
        this.galaxies.push(g);
      }
      super.add(g);
    };
    if (Array.isArray(galaxy)) {
      galaxy.forEach(addOne);
    } else {
      addOne(galaxy);
    }
  }

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
          "GalaxiesController.instance(scene) must be called once with a BABYLON.Scene"
        );
      }
      GalaxiesController._instance = new GalaxiesController(scene);
    }
    return GalaxiesController._instance;
  }

  getByName(name: string) {
    return this.galaxies[name as any];
  }

  getAll() {
    return this.galaxies;
  }
}
