import * as BABYLON from "babylonjs";
import type { Camera } from "@/services/Cameras/types/Camera";

const MainCamera: Camera = {
  type: "arcRotate", 
  name: "Main Camera",
  position: new BABYLON.Vector3(0, 5, -10),
};

export default MainCamera;
