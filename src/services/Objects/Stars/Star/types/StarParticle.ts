import * as BABYLON from "babylonjs";

export interface StarParticle extends BABYLON.Particle {
  diameter?: number;
  spectralType?: string;
  // color stays required
  color: BABYLON.Color4;
}
