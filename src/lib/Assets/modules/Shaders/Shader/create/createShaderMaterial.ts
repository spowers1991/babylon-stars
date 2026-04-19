import * as BABYLON from "babylonjs";
import { createShader } from "./createShader";

/**
 * Create and register a new shader, returning the ShaderMaterial.
 */
export function createShaderMaterial(
  scene: BABYLON.Scene,
  name: string,
  vertexShader: string,
  fragmentShader: string,
  uniforms: string[],
  attributes: string[],
  options?: Partial<BABYLON.IShaderMaterialOptions>
) {
  return createShader(scene, name, vertexShader, fragmentShader, uniforms, attributes, options);
}
