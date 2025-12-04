import * as BABYLON from "babylonjs";
import type { GalaxyConfig } from "./types/GalaxyConfig";
import { createStarPointMap } from "@/services/Objects/Stars/actions/createStarPointMap";

export class Galaxy {
  public readonly id: number;
  public readonly name: string;
  public readonly stars: GalaxyConfig["stars"];
  private scene: BABYLON.Scene;

  private constructor(scene: BABYLON.Scene, config: GalaxyConfig) {
    this.scene = scene;
    this.id = config.id;
    this.name = config.name ?? "Unknown Galaxy";
    this.stars = config.stars ?? [];
  }

  static async create(scene: BABYLON.Scene, config: GalaxyConfig) {
    const galaxy = new Galaxy(scene, config);
    await galaxy.init();
    return galaxy;
  }

  private async init() {
    await createStarPointMap(this.scene, this.stars as any, this.name,);
  }
}
