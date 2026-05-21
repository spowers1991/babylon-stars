import * as BABYLON from "babylonjs";
import type { MeshConfig } from "./Mesh/types/MeshConfig";
import { createMesh as ACTIONS_createMesh } from "./Mesh/actions/create/createMesh";
import { createMeshes as ACTIONS_createMeshes } from "./actions/create/createMeshes";
import { setMeshes as ACTIONS_setMeshes } from "./actions/set/setMeshes";

export class MeshesController {
  public meshes:  [type: MeshConfig['type'], meshConfigs: MeshConfig[]][] = [];

  public create(
    scene: BABYLON.Scene,
    config: MeshConfig
  ): BABYLON.AbstractMesh {
    
    const mesh = ACTIONS_createMesh(scene, config, this.meshes);

    return mesh;
  }

  createMeshes(
    scene: BABYLON.Scene,
  ): void {
    this.meshes = ACTIONS_createMeshes(scene);
  }

  setMeshes(configs: any): void {
    this.meshes = ACTIONS_setMeshes(configs);
  }

}