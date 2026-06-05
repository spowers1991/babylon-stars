import * as BABYLON from "babylonjs";
import type { MeshConfig } from "./Mesh/types/MeshConfig";
import { createMesh as ACTIONS_createMesh } from "./Mesh/actions/create/createMesh";
import { createMeshesConfigs as ACTIONS_createMeshesConfigs } from "./actions/create/createMeshesConfigs";
import { setMeshConfigs as ACTIONS_setMeshesConfigs } from "./actions/set/setMeshConfigs";
import { setMeshPool as ACTIONS_setMeshPool } from "./actions/set/setMeshPool";
import { getMesh as ACTIONS_getMesh } from "./Mesh/actions/get/getMesh";

export class MeshesController {
  public meshConfigs:  [type: MeshConfig['type'], meshConfigs: MeshConfig[]][] = [];
  public meshPool: BABYLON.AbstractMesh[] = [];

  public create(
    scene: BABYLON.Scene,
    config: MeshConfig
  ): BABYLON.AbstractMesh {
    
    const mesh = ACTIONS_createMesh(scene, config);

    return mesh;
  }

  public createMeshesConfigs(
    scene: BABYLON.Scene,
  ): void {
    this.meshConfigs = ACTIONS_createMeshesConfigs(scene);
  }

  public setMeshesConfigs(configs: any): void {
    this.meshConfigs = ACTIONS_setMeshesConfigs(configs);
  }

  public setMeshPool(
    scene: BABYLON.Scene,
    meshConfigs: [type: MeshConfig['type'], meshConfigs: MeshConfig[]][],
  ): void {
    this.meshPool = ACTIONS_setMeshPool(scene, meshConfigs);
  }

  public getMesh(scene: BABYLON.Scene, config: MeshConfig): BABYLON.AbstractMesh {
    const mesh = ACTIONS_getMesh(scene, config)
    return mesh as BABYLON.AbstractMesh;
  }
  
}