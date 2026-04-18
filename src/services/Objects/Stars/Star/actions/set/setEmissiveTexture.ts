import * as BABYLON from "babylonjs";

/**
 * Assigns a texture as the emissive texture for a mesh's material.
 */
export function setEmissiveTexture(mesh: BABYLON.AbstractMesh, material: BABYLON.Material, texture: BABYLON.Texture) {
  if (!mesh || !material) return;
  mesh.material = material;
  if (texture) {
    if (material instanceof BABYLON.StandardMaterial) {
      material.emissiveTexture = texture;
    } else if (material instanceof BABYLON.PBRMaterial) {
      material.emissiveTexture = texture;
    }
  }
}
