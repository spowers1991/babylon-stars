import * as BABYLON from "babylonjs";

/**
 * Creates and registers a Babylon.js ShaderMaterial with given vertex/fragment code and uniforms.
 * @param scene The Babylon.js scene
 * @param name The material name
 * @param vertexShader The vertex shader code
 * @param fragmentShader The fragment shader code
 * @param uniforms Array of uniform names
 * @param attributes Array of attribute names
 * @param options Optional: additional ShaderMaterial options
 * @returns BABYLON.ShaderMaterial
 */
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
  const shaderMaterial = new BABYLON.ShaderMaterial(
    name,
    scene,
    {
      vertex: name,
      fragment: name,
    },
    {
      attributes,
      uniforms,
      ...options,
    }
  );
  return shaderMaterial;
}
