import * as BABYLON from "babylonjs";

export interface SPSConfig {
  diameter?: number; // template mesh diameter
  color?: BABYLON.Color4; // default color for particles
  transparency?: number; // transparency level for particles
  spaceBetween?: number; // scaling factor for particle sizes
  onInitParticle?: (particle: BABYLON.SolidParticle, data?: any) => void;
}