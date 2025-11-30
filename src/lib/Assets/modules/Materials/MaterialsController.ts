import * as BABYLON from "babylonjs";

export class MaterialsController {
  private materials: BABYLON.Material[] = [];
  private meshMaterialMap: Map<BABYLON.AbstractMesh, BABYLON.Material> = new Map();

  // ✅ StandardMaterial
  public createStandard(scene: BABYLON.Scene, name: string): BABYLON.StandardMaterial {
    const material = new BABYLON.StandardMaterial(name, scene);
    this.materials.push(material);
    return material;
  }

  // ✅ PBRMaterial
  public createPBR(scene: BABYLON.Scene, name: string): BABYLON.PBRMaterial {
    const material = new BABYLON.PBRMaterial(name, scene);
    this.materials.push(material);
    return material;
  }

  // ✅ Assign material to a mesh and track it
  public assign({ mesh, material }: { mesh: BABYLON.AbstractMesh | null; material: BABYLON.Material | null }): void {
    if (!mesh || !material) return;

    mesh.material = material;
    this.meshMaterialMap.set(mesh, material); // track the relationship
  }

  // ✅ Get the material for a specific mesh
  public getMaterialForMesh({ mesh }: { mesh: BABYLON.AbstractMesh }): BABYLON.Material | undefined {
    return this.meshMaterialMap.get(mesh);
  }

  // ✅ Get all materials
  public getAll(): BABYLON.Material[] {
    return this.materials;
  }

  // ✅ Dispose material by index
  public disposeByIndex({ index }: { index: number }): void {
    const material = this.materials[index];
    if (material) {
      material.dispose();
      this.materials.splice(index, 1);

      // Remove from mesh map
      for (const [mesh, mat] of this.meshMaterialMap.entries()) {
        if (mat === material) {
          this.meshMaterialMap.delete(mesh);
        }
      }
    }
  }

  // ✅ Dispose all materials
  public disposeAll(): void {
    this.materials.forEach(mat => mat.dispose());
    this.materials = [];
    this.meshMaterialMap.clear();
  }

  // ---------------------------------------------------------
  // 🔹 PBR Material Helpers (object-style params)
  // ---------------------------------------------------------

  public setAlbedoTexture({ material, texture }: { material: BABYLON.Material; texture: BABYLON.Texture }): void {
    if (material instanceof BABYLON.PBRMaterial) {
      material.albedoTexture = texture;
    }
  }

  public setEmissiveColor({ material, color }: { material: BABYLON.Material; color: BABYLON.Color3 }): void {
    if (material instanceof BABYLON.PBRMaterial || material instanceof BABYLON.StandardMaterial) {
      material.emissiveColor = color;
    }
  }

  public setEmissiveIntensity({ material, value }: { material: BABYLON.Material; value: number }): void {
    if (material instanceof BABYLON.PBRMaterial) {
      material.emissiveIntensity = value;
    }
  }

  public setRoughness({ material, value }: { material: BABYLON.Material; value: number }): void {
    if (material instanceof BABYLON.PBRMaterial) {
      material.roughness = value;
    }
  }

  public setMetallic({ material, value }: { material: BABYLON.Material; value: number }): void {
    if (material instanceof BABYLON.PBRMaterial) {
      material.metallic = value;
    }
  }

  public setAlpha({ material, value }: { material: BABYLON.Material; value: number }): void {
    material.alpha = value;
  }

  public setBumpTexture({ material, texture }: { material: BABYLON.Material; texture: BABYLON.Texture }): void {
    if (material instanceof BABYLON.PBRMaterial || material instanceof BABYLON.StandardMaterial) {
      (material as any).bumpTexture = texture;
    }
  }
}
