import * as BABYLON from "babylonjs";
import { MeshType, MeshOptions } from "./Mesh/types/Mesh";
import { createMeshByType } from "./Mesh/factories/createMeshByType";
import { addToMeshes } from "./Mesh/actions/addToMeshes";

export class MeshesController {
  public meshes: BABYLON.Mesh[] = [];

  public load(
    mesh: BABYLON.Mesh
  ): BABYLON.Mesh {
    addToMeshes(this.meshes, mesh)
    return mesh;
  }

  public create(
    scene: BABYLON.Scene,
    meshType: MeshType,
    name: string,
    options: MeshOptions
  ): BABYLON.Mesh {
    const mesh = createMeshByType(scene, meshType, name, options);
    addToMeshes(this.meshes, mesh)
    return mesh;
  }

  public getAll(): BABYLON.Mesh[] {
    return this.meshes;
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
