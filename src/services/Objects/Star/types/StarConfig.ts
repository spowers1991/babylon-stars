import * as BABYLON from "babylonjs";

export interface StarConfig {
  id: number;          
  name?: string;
  diameter?: number;
  textureUrl?: string;
  emissiveColor?: BABYLON.Color3;
  emissiveIntensity?: number;
  position?: BABYLON.Vector3;
}
