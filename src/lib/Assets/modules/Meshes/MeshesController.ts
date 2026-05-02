import * as BABYLON from "babylonjs";
import type { MeshConfig } from "./Mesh/types/MeshConfig";
import { createMesh as ACTIONS_createMesh } from "./Mesh/actions/create/createMesh";
import { setMeshToMeshes as ACTIONS_setMeshToMeshes } from "./Mesh/actions/set/setMeshToMeshes";
import { createMeshPool as ACTIONS_createMeshPool } from "./Mesh/actions/create/createMeshPool";
import { setMeshPool as ACTIONS_setMeshPool } from "./Mesh/actions/set/setMeshPool";

export class MeshesController {
  public meshes: BABYLON.Mesh[] = [];
  public meshPool: [MeshConfig['type'], BABYLON.Mesh[]][] = [];

  public create(
    scene: BABYLON.Scene,
    config: MeshConfig
  ): BABYLON.Mesh {

    const mesh = ACTIONS_createMesh(scene, config, this.meshPool);
    ACTIONS_setMeshToMeshes(scene, this.meshes, mesh);
    this.meshes = scene.meshes as BABYLON.Mesh[];
    //this.setMeshPool(scene, config, this.meshes);
    //console.log(this.meshes, scene.meshes);
    return mesh;
  }

  public createMeshPool(
    scene: BABYLON.Scene,
    meshes: BABYLON.Mesh[]
  ): void {
    this.meshPool = ACTIONS_createMeshPool(scene, meshes);
  }

  public setMeshPool(scene: BABYLON.Scene, config: MeshConfig, meshes: BABYLON.Mesh[]): void {
    this.meshPool = ACTIONS_setMeshPool(scene, config, meshes) || this.meshPool;
    this.meshes = scene.meshes as BABYLON.Mesh[];
  }

  public setMeshToMeshes(
    scene: BABYLON.Scene,
    mesh: BABYLON.Mesh
  ): BABYLON.Mesh {
    ACTIONS_setMeshToMeshes(scene, this.meshes, mesh)
    return mesh;
  }

  public getAll(): BABYLON.Mesh[] {
    return this.meshes;
  }

  public loadByIndex(index: number): BABYLON.Mesh {
    const mesh = this.meshes[index];
    return mesh;
  }

  public disposeByIndex(index: number): void {
    const mesh = this.meshes[index];
    if (mesh) {
      mesh.dispose()
      this.meshes.splice(index, 1);
    }
  }

  public disposeAll(): void {
    this.meshes.forEach(mesh => mesh.dispose());
    this.meshes = [];
  }
}