import * as BABYLON from "babylonjs";

/**
 * Assigns a color as the emissive color for a mesh's material.
 */
export function setEmissiveColor(mesh: BABYLON.AbstractMesh, material: BABYLON.Material, color: BABYLON.Color3) {
 if(!mesh || !material) return;
    mesh.material = material;
  if (material instanceof BABYLON.StandardMaterial) {
    material.emissiveColor = color;
  } else if (material instanceof BABYLON.PBRMaterial) {
    material.emissiveColor = color;
  }
}
