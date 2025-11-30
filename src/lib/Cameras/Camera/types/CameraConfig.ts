import * as BABYLON from "babylonjs";
import { CameraType } from "@/lib/Cameras/Camera/types/CameraType";

export interface CameraConfig {
  type: CameraType;
  name: string;
  position?: BABYLON.Vector3; 
  alpha?: number;
  beta?: number;
  radius?: number;
  target?: BABYLON.Vector3;
}
