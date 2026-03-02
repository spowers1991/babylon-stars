import * as BABYLON from "babylonjs";
import type { GalaxyConfig } from "./types/GalaxyConfig";
import type { StarData } from "../../Stars/Star/types/StarData";
import { createGalaxyPCS } from "./actions/createGalaxyPCS";
import { createGalaxySPS } from "./actions/createGalaxySPS";

export class Galaxy {
  public readonly id: number;
  public readonly name: string;
  public starsData: StarData[];
  public scene: BABYLON.Scene;
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
    //const pcs = await createGalaxyPCS(this.scene, this.starsData, PCSName)
    //this.pcs = pcs;

    const SPSName = this.name + " SPS";
    const sps = await createGalaxySPS(this.scene, this.starsData, SPSName);
    this.sps = sps;
  
  }

}
