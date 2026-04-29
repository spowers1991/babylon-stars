import * as BABYLON from "babylonjs";
import { MeshType, MeshOptions } from "./Mesh/types/Mesh";
import { createMesh as ACTIONS_createMesh } from "./Mesh/actions/create/createMesh";
import { setMeshToMeshes as ACTIONS_setMeshToMeshes } from "./Mesh/actions/set/setMeshToMeshes";

export class MeshesController {
  public meshes: BABYLON.Mesh[] = [];

  public create(
    scene: BABYLON.Scene,
    meshType: MeshType,
    name: string,
    options: MeshOptions
  ): BABYLON.Mesh {

    const mesh = ACTIONS_createMesh(scene, meshType, name, options);
    ACTIONS_setMeshToMeshes(this.meshes, mesh);

    return mesh;
  }

  public setMeshToMeshes(
    mesh: BABYLON.Mesh
  ): BABYLON.Mesh {
    ACTIONS_setMeshToMeshes(this.meshes, mesh)
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
