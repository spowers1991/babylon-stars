import { ObjectsController } from "@/lib/Objects/ObjectsController";

export interface SceneConfig {
  objects: ObjectsController;
  clearColor?: BABYLON.Color4;
  gravity?: BABYLON.Vector3;
  collisions?: boolean;
  physics?: {
    gravity?: BABYLON.Vector3;
    plugin?: BABYLON.IPhysicsEnginePlugin;
  };
}