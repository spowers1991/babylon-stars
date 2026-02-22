import * as BABYLON from "babylonjs";
import { getParticlesInRadiusPCS } from "./PCS/helpers/getParticlesInRadiusPCS";
import { getParticlesInRadiusSPS } from "./SPS/helpers/getParticlesInRadiusSPS";
import { particlesToDataPCS } from "./PCS/actions/particlesToDataPCS";
import { particlesToDataSPS } from "./SPS/actions/particlesToDataSPS";
import { updatePCS } from "./PCS/actions/updatePCS";
import { updateSPS } from "./SPS/actions/updateSPS";
import { createPCS } from "./PCS/actions/createPCS";
import { createSPS } from "./SPS/actions/createSPS"; 
import type { SPSConfig } from "./SPS/types/SPSConfig";

type ParticleSystemType = BABYLON.PointsCloudSystem | BABYLON.SolidParticleSystem;

export class ParticlesController {
  
  private readonly scene: BABYLON.Scene;

  private static _instance: ParticlesController;
  private pcsSystems: BABYLON.PointsCloudSystem[] = [];
  private spsSystems: BABYLON.SolidParticleSystem[] = [];
  private namedSystems: Record<string, ParticleSystemType> = {};
  public particlesNearCamera: BABYLON.Particle[] = [];
  public particlesNearCameraPCS: BABYLON.CloudPoint[] = [];
  public particlesNearCameraSPS: BABYLON.SolidParticle[] = [];

  private constructor(scene: BABYLON.Scene) {
    this.scene = scene;
  }

  public static instance(scene?: BABYLON.Scene): ParticlesController {
    if (!this._instance) {
      if (!scene) {
        throw new Error(
          "ParticlesController.instance(scene) must be called once with a BABYLON.Scene"
        );
      }
      this._instance = new ParticlesController(scene);
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

  getAllPCS(): BABYLON.PointsCloudSystem[] {
    return this.pcsSystems;
  }

  async createSPS(
    scene: BABYLON.Scene,
    data: any[],
    name: string,
    options: SPSConfig = {}
  ): Promise<BABYLON.SolidParticleSystem> {
    // Call the helper createSPS function
    const sps = await createSPS(scene, data, name, options);

    // Add it to the controller's collection
    this.add(sps, name);

    return sps;
  }

  updateSPS(sps: BABYLON.SolidParticleSystem, data: any, options: SPSConfig = {}) {
    updateSPS(sps, data, options);
  }

  getSPSByName(name: string): any | undefined {
    const system = this.namedSystems[name];
    return system instanceof BABYLON.SolidParticleSystem ? system : undefined;
  }

  getAllSPS(): BABYLON.SolidParticleSystem[] {
    return this.spsSystems;
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

  particlesToDataPCS(particles : BABYLON.CloudPoint[], data: Object[]){
    return particlesToDataPCS(particles, data)
  }

  particlesToDataSPS(particles : BABYLON.SolidParticle[], data: Object[]){
    return particlesToDataSPS(particles, data)
  }
}
