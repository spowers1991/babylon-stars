import * as BABYLON from "babylonjs";
import type { MeshConfig } from "./Mesh/types/MeshConfig";
import { createMesh as ACTIONS_createMesh } from "./Mesh/actions/create/createMesh";
import { createMeshes as ACTIONS_createMeshes } from "./actions/create/createMeshes";
import { setMeshes as ACTIONS_setMeshes } from "./actions/set/setMeshes";

export class MeshesController {
  public meshes:  [type: MeshConfig['type'], meshConfigs: MeshConfig[]][] = [];
  public meshPool = new Set<any>();

  public create(
    scene: BABYLON.Scene,
    config: MeshConfig
  ): BABYLON.AbstractMesh {
    
    const mesh = ACTIONS_createMesh(scene, config);
 console.log(this.meshPool);
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

  public setToMeshPool(mesh: any) {
    if (mesh) {
      this.meshPool.add(mesh);
    }
    console.log(this.meshPool);
  }

  public removeFromMeshPool(mesh: any) {
    if (mesh ) {
      this.meshPool.delete(mesh);
    }
  }

}