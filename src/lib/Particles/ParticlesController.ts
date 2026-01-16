import * as BABYLON from "babylonjs";
import { getParticlesInRadiusPCS } from "./PCS/helpers/getParticlesInRadiusPCS";
import { getParticlesInRadiusSPS } from "./SPS/helpers/getParticlesInRadiusSPS";
import { particlesToDataPCS } from "./PCS/actions/particlesToDataPCS";
import { updatePCS } from "./PCS/actions/updatePCS";
import { updateSPS } from "./SPS/actions/updateSPS";
import { createPCS } from "./PCS/actions/createPCS";
import { createSPS } from "./SPS/actions/createSPS"; 
import type { ParticleOptionsSPS } from "./SPS/types/ParticleOptionsSPS";

type ParticleSystemType = BABYLON.PointsCloudSystem | BABYLON.SolidParticleSystem;

export class ParticlesController {
  
  private static _instance: ParticlesController;
  private pcsSystems: BABYLON.PointsCloudSystem[] = [];
  private spsSystems: BABYLON.SolidParticleSystem[] = [];
  private namedSystems: Record<string, ParticleSystemType> = {};
  public particlesNearCamera: BABYLON.Particle[] = [];
  public particlesNearCameraPCS: BABYLON.CloudPoint[] = [];

  public static get instance(): ParticlesController {
    if (!this._instance) {
      this._instance = new ParticlesController();
    }
    return this._instance;
  }

  add(system: ParticleSystemType, name?: string) {
    if (system instanceof BABYLON.PointsCloudSystem) {
      this.pcsSystems.push(system);
    } else if (system instanceof BABYLON.SolidParticleSystem) {
      this.spsSystems.push(system);
    }

    if (name) {
      this.namedSystems[name] = system;
    }
  }

  getByName(name: string): ParticleSystemType | undefined {
    return this.namedSystems[name];
  }

  createPCS(
    scene: BABYLON.Scene,
    data: any[],
    name: string){
    createPCS(scene, data, name)
  }

  updatePCS( pcs: BABYLON.PointsCloudSystem, data: any, options: any = {}){ 
    updatePCS(pcs, data, options); 
  }

  getPCSByName(name: string): any | undefined {
  const system = this.namedSystems[name];
    return system instanceof BABYLON.PointsCloudSystem ? system : undefined;
  }

  async createSPS(
    scene: BABYLON.Scene,
    data: any[],
    name: string,
    options: ParticleOptionsSPS = {}
  ): Promise<BABYLON.SolidParticleSystem> {
    // Call the helper createSPS function
    const sps = await createSPS(scene, data, name, options);

    // Add it to the controller's collection
    this.add(sps, name);

    return sps;
  }

  updateSPS(sps: BABYLON.SolidParticleSystem, data: any, options: any = {}) {
    updateSPS(sps, data, options);
  }

  getSPSByName(name: string): any | undefined {
    const system = this.namedSystems[name];
    return system instanceof BABYLON.SolidParticleSystem ? system : undefined;
  }

  getAllSystems(): ParticleSystemType[] {
    return [...this.pcsSystems, ...this.spsSystems];
  }

  getParticlesInRadiusPCS(center: BABYLON.Vector3, radius: number) {
    const particlesNearCenter = getParticlesInRadiusPCS(this, center, radius);
    return particlesNearCenter;
  }

  getParticlesInRadiusSPS(center: BABYLON.Vector3, radius: number) {
    const particlesNearCenter = getParticlesInRadiusSPS(this, center, radius);
    return particlesNearCenter;
  }

  particlesToDataPCS(scene: BABYLON.Scene, particles : BABYLON.CloudPoint[], data: Object[]){
    return particlesToDataPCS(scene, particles, data)
  }
}
