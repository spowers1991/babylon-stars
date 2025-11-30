// src/cameras/types/FreeCameraConfig.ts
import type { Camera } from "../../../../services/Cameras/types/Camera";
import * as BABYLON from "babylonjs";

export interface FreeCamera extends Camera {
  type: "free";
  position?: BABYLON.Vector3;
}
