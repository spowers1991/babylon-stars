import * as BABYLON from "babylonjs";
import { getParticlesInRadiusFromPCS } from "./helpers/getParticlesInRadiusFromPCS";
import { getParticlesInRadius } from "./helpers/getParticlesInRadius";

export class ParticlesController {
  private static _instance: ParticlesController;
  private systems: BABYLON.PointsCloudSystem[] = [];
  private namedSystems: Record<string, BABYLON.PointsCloudSystem> = {};

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
    return getParticlesInRadius(this, center, radius);
  }

  getParticlesInRadiusFromPCS(name: string, center: BABYLON.Vector3, radius: number) {
    return getParticlesInRadiusFromPCS(this, name, center, radius);
  }
}
