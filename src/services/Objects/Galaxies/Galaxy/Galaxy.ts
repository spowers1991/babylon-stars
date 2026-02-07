import * as BABYLON from "babylonjs";
import type { GalaxyConfig } from "./types/GalaxyConfig";
import type { StarData } from "../../Stars/Star/types/StarData";
import { createStarsPCS } from "./actions/createStarsPCS";
import { createStarsSPS } from "./actions/createStarsSPS";

export class Galaxy {
  public readonly id: number;
  public readonly name: string;
  public readonly starsData: StarData[];
  private scene: BABYLON.Scene;
  public pcs : BABYLON.PointsCloudSystem | null = null;
  public sps : BABYLON.SolidParticleSystem | null = null;

  private constructor(scene: BABYLON.Scene, config: GalaxyConfig) {
    this.scene = scene;
    this.id = config.id;
    this.name = config.name ?? "Unknown Galaxy";
    this.starsData = config.starsData ?? [];
  }

  static async create(scene: BABYLON.Scene, config: GalaxyConfig) {
    const galaxy = new Galaxy(scene, config);
    await galaxy.init();
    return galaxy;
  }

  private async init() {

    //const PCSName = this.name+" PCS";
    //const pcs = await createStarsPCS(this.scene, this.starsData, PCSName)
    //this.pcs = pcs;

    const SPSName = this.name + " SPS";
    const sps = await createStarsSPS(this.scene, this.starsData, SPSName);
    this.sps = sps;
  
  }

}
