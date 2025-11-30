import * as BABYLON from "babylonjs";

/**
 * Apply a self-illuminating texture to a mesh
 * @param mesh - The mesh to apply the texture to
 * @param texture - The texture to apply
 * @param name - Optional name for the material
 */
export function applyTexture(material: BABYLON.PBRMaterial, texture: BABYLON.Texture,) {
  if (!material || !texture) return;
  material.albedoTexture = texture;
}
