import * as BABYLON from "babylonjs";
import { getParticlesInRadiusFromPCS } from "./helpers/getParticlesInRadiusFromPCS";
import { getParticlesInRadius } from "./helpers/getParticlesInRadius";
import { cloudPointsToData } from "./actions/cloudPointsToData";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export class ParticlesController {
  private static _instance: ParticlesController;
  private systems: BABYLON.PointsCloudSystem[] = [];
  private namedSystems: Record<string, BABYLON.PointsCloudSystem> = {};
  public particlesNearCamera: BABYLON.CloudPoint[] = [];

  public static get instance(): ParticlesController {
    if (!this._instance) {
      this._instance = new ParticlesController();
    }
    return this._instance;
  }

  add(pcs: BABYLON.PointsCloudSystem, name?: string) {
    this.systems.push(pcs);
    if (name) this.namedSystems[name] = pcs;
  }

  getByName(name: string) {
    return this.namedSystems[name];
  }

  getAllPCS() {
    return this.systems;
  }

  getParticlesInRadius(center: BABYLON.Vector3, radius: number) {
    const particlesNearCenter = getParticlesInRadius(this, center, radius);
    return particlesNearCenter;
  }

  getParticlesInRadiusFromPCS(name: string, center: BABYLON.Vector3, radius: number) {
    return getParticlesInRadiusFromPCS(this, name, center, radius);
  }

  cloudPointsToData(scene: BABYLON.Scene, points : BABYLON.CloudPoint[], data: StarData[]){
    return cloudPointsToData(scene, points, data)
  }
}
