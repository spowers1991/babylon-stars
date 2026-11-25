import * as BABYLON from "babylonjs";

export function createShader(
  scene: BABYLON.Scene,
  name: string,
  vertexShader: string,
  fragmentShader: string,
  uniforms: string[],
  attributes: string[],
  options?: Partial<BABYLON.IShaderMaterialOptions>
): BABYLON.ShaderMaterial {
  BABYLON.Effect.ShadersStore[`${name}VertexShader`] = vertexShader;
  BABYLON.Effect.ShadersStore[`${name}FragmentShader`] = fragmentShader;
  return new BABYLON.ShaderMaterial(
    name,
    scene,
    { vertex: name, fragment: name },
    { attributes, uniforms, ...options }
  );
}
