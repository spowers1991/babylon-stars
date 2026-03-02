import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import * as BABYLON from "babylonjs";

export interface Galaxy{
  scene: BABYLON.Scene;
  id: number;          
  name?: string;
  starsData?: StarData[];
  pcs?: BABYLON.PointsCloudSystem;
  sps?: BABYLON.SolidParticleSystem;
}
