import * as BABYLON from "babylonjs";
import { getParticlesInRadiusFromPCS } from "./helpers/getParticlesInRadiusFromPCS";
import { getParticlesInRadius } from "./helpers/getParticlesInRadius";
import { cloudPointsToData } from "./actions/cloudPointsToData";

export class ParticlesController {
  private static _instance: ParticlesController;
  private systems: BABYLON.PointsCloudSystem[] = [];
  private namedSystems: Record<string, BABYLON.PointsCloudSystem> = {};
  public particlesNearCamera: BABYLON.Particle[] = [];

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
    const particlesNearCamera = getParticlesInRadius(this, center, radius);
    this.particlesNearCamera = particlesNearCamera;
    return particlesNearCamera;
  }

  getParticlesInRadiusFromPCS(name: string, center: BABYLON.Vector3, radius: number) {
    return getParticlesInRadiusFromPCS(this, name, center, radius);
  }

  cloudPointsToData(particles : BABYLON.Particle[], data: any){
    return cloudPointsToData(particles, data)
  }
}
