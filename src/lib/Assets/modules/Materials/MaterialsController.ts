import * as BABYLON from "babylonjs";
import { createMaterial as ACTIONS_createMaterial } from "./Material/actions/create/createMaterial";
import { getMaterial as ACTIONS_getMaterial } from "./Material/actions/get/getMaterial";
import type {
  MaterialConfig,
  PBRMaterialConfig,
  StandardMaterialConfig,
} from "./Material/types/MaterialConfig";
import { runCleanMaterials as ACTIONS_runCleanMaterials } from "./actions/run/runCleanMaterials";

export class MaterialsController {
  public materialsPool: BABYLON.Material[] = [];
  public readonly ownedMaterials = new WeakSet<BABYLON.Material>();
  private meshMaterialMap = new Map<BABYLON.AbstractMesh, BABYLON.Material>();

  public create(scene: BABYLON.Scene, config: StandardMaterialConfig): BABYLON.StandardMaterial;
  public create(scene: BABYLON.Scene, config: PBRMaterialConfig): BABYLON.PBRMaterial;
  public create(scene: BABYLON.Scene, config: MaterialConfig): BABYLON.Material {
    return ACTIONS_createMaterial(scene, config);
  }

  public getMaterial(scene: BABYLON.Scene, config: MaterialConfig): BABYLON.Material {
    return ACTIONS_getMaterial(scene, config);
  }

  public createStandard(scene: BABYLON.Scene, name: string): BABYLON.StandardMaterial {
    return this.create(scene, { type: "StandardMaterial", name });
  }

  public createPBR(scene: BABYLON.Scene, name: string): BABYLON.PBRMaterial {
    return this.create(scene, { type: "PBRMaterial", name });
  }

  public assign({ mesh, material }: { mesh: BABYLON.AbstractMesh | null; material: BABYLON.Material | null }): void {
    if (!mesh || !material) return;

    mesh.material = material;
    this.meshMaterialMap.set(mesh, material);
  }

  public getMaterialForMesh({ mesh }: { mesh: BABYLON.AbstractMesh }): BABYLON.Material | undefined {
    return this.meshMaterialMap.get(mesh);
  }

  public getAll(): BABYLON.Material[] {
    return this.materialsPool;
  }

  public disposeByIndex({ index }: { index: number }): void {
    const material = this.materialsPool[index];
    if (material) {
      material.dispose();
      this.materialsPool.splice(index, 1);

      for (const [mesh, mat] of this.meshMaterialMap.entries()) {
        if (mat === material) {
          this.meshMaterialMap.delete(mesh);
        }
      }
    }
  }

  public disposeAll(): void {
    this.materialsPool.forEach((material) => material.dispose());
    this.materialsPool.length = 0;
    this.meshMaterialMap.clear();
  }

  public cleanUp(scene: BABYLON.Scene): void {
    const removedMaterials = ACTIONS_runCleanMaterials(
      scene,
      this.materialsPool,
      this.ownedMaterials
    );
    for (const [mesh, material] of this.meshMaterialMap.entries()) {
      if (removedMaterials.includes(material)) {
        this.meshMaterialMap.delete(mesh);
      }
    }
  }

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
    if (material instanceof BABYLON.PBRMaterial) {
      material.bumpTexture = texture;
    } else if (material instanceof BABYLON.StandardMaterial) {
      material.bumpTexture = texture;
    }
  }
}
