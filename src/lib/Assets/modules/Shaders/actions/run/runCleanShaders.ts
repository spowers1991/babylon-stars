import * as BABYLON from "babylonjs";

export function runCleanShaders(
  scene: BABYLON.Scene,
  shadersPool: BABYLON.ShaderMaterial[],
  ownedShaders: WeakSet<BABYLON.ShaderMaterial>
): void {
  scene.materials.slice().forEach((material) => {
    if (
      material instanceof BABYLON.ShaderMaterial &&
      ownedShaders.has(material) &&
      !shadersPool.includes(material)
    ) {
      material.dispose();
    }
  });
}
