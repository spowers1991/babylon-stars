import * as BABYLON from "babylonjs";

export interface SPSConfig {
  diameter?: number; // template mesh diameter
  onInitParticle?: (particle: BABYLON.SolidParticle, data?: any) => void;
}