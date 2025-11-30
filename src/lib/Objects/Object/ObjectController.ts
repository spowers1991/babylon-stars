import * as BABYLON from "babylonjs";

export class ObjectController {
  id: number;
  name: string;
  position: BABYLON.Vector3;
  mesh: BABYLON.AbstractMesh | null;
  material: BABYLON.Material | null;
  texture: BABYLON.Texture | null;

  constructor(props: {
    id: number;
    name?: string;
    position?: BABYLON.Vector3;
    mesh?: BABYLON.AbstractMesh | null;
    material?: BABYLON.Material | null;
    texture?: BABYLON.Texture | null;
  }) {
    this.id = props.id;
    this.name = props.name ?? "Unnamed Object";
    this.position = props.position ?? new BABYLON.Vector3(0, 0, 0);
    this.mesh = props.mesh ?? null;
    this.material = props.material ?? null;
    this.texture = props.texture ?? null;

    if (this.material && this.mesh) {
      this.mesh.material = this.material;
    }

    if (this.mesh) {
     this.mesh.position.copyFrom(this.position); 
    }
    
  }
}

export default ObjectController;
