import * as BABYLON from "babylonjs";
import type { Camera } from "@/services/Cameras/types/Camera";

const MainCamera: Camera = {
  type: "arcRotate",
  name: "Main Camera",
  position: new BABYLON.Vector3(0, 0, 0),
  lowerRadiusLimit: 5,
  upperRadiusLimit: 5000,
  zoomSpeed: 1, // Babylon default wheelPrecision is 50 (lower = faster)
  panSpeed: 20, // Babylon default panningSensibility is 1000 (lower = faster)
  minZ: 0.01,
  maxZ: 1_000_000,
};

export default MainCamera;