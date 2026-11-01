import * as BABYLON from "babylonjs";

export function setShaderPool(
  shadersPool: BABYLON.ShaderMaterial[],
  shader: BABYLON.ShaderMaterial
): void {
  if (!shadersPool.includes(shader)) {
    shadersPool.push(shader);
  }
}
