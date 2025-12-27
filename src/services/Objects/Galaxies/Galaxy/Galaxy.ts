import * as BABYLON from "babylonjs";
import type { GalaxyConfig } from "./types/GalaxyConfig";
import type { StarData } from "../../Stars/Star/types/StarData";
import { createStarPointMap } from "@/services/Objects/Stars/actions/createStarPointMap";
//import { createGalaxySPS } from "./actions/createGalaxySPS";
import { ParticlesController } from "@/lib/Particles/ParticlesController";

export class Galaxy {
  public readonly id: number;
  public readonly name: string;
  public readonly stars: StarData[];
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
  
  const PCSName = this.name+" PCS";
  const particlesPCS = await createStarPointMap(this.scene, this.stars, PCSName)

  const SPSName = this.name+" SPS";
  //const particlesSBS = await createGalaxySPS(this.scene, this.stars, SPSName);

  //console.log(particlesSBS, particlesPCS)
  ParticlesController.instance.add(particlesPCS, PCSName);
  //ParticlesController.instance.add(particlesSBS, SPSName)
}

}
