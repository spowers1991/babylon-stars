// src/cameras/types/ArcRotateCameraConfig.ts
import type { Camera } from "../../../../services/Cameras/types/Camera";
import * as BABYLON from "babylonjs";

export interface ArcRotateCamera extends Camera {
  type: "arcRotate";
  alpha?: number;
  beta?: number;
  radius?: number;
  target?: BABYLON.Vector3;
}
