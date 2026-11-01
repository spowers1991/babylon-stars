import * as BABYLON from "babylonjs";
import type { ShadersController } from "../../../ShadersController";

export function getShader(
  controller: ShadersController,
  name: string,
  scene?: BABYLON.Scene
): BABYLON.ShaderMaterial | undefined {
  return controller.shadersPool.find(
    (shader) => shader.name === name && (!scene || shader.getScene() === scene)
  );
}
