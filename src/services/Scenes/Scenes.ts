import * as BABYLON from "babylonjs";
import { SceneConfig } from "../../lib/Scenes/types/SceneConfig";

export const Scenes = [
  {
    name: "Scene1",
    // engine will be injected at runtime
    config: {
      clearColor: new BABYLON.Color4(0.05, 0.05, 0.1, 1),
    } as SceneConfig,
  },
  {
    name: "Scene1Copy",
    config: {
      clearColor: new BABYLON.Color4(0.05, 0.05, 0.1, 1),
    } as SceneConfig,
  },
];

export default Scenes;
