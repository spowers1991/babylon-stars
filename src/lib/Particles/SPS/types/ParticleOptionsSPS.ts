import * as BABYLON from "babylonjs";

export interface ParticleOptionsSPS {
  diameter?: number; // template mesh diameter
  onInitParticle?: (particle: BABYLON.SolidParticle, data?: any) => void;
}