
import * as BABYLON from "babylonjs";
import { ShadersController } from "@/lib/Assets/modules/Shaders/ShadersController";
import { STAR_VERTEX_SHADER, STAR_FRAGMENT_SHADER } from "../../shaders/StarShaders";

/**
 * Creates a ShaderMaterial for a star-like animated surface.
 * @param scene The Babylon.js scene
 * @param name The material name
 * @param color The base color of the star
 * @returns BABYLON.ShaderMaterial
 */
export function createStarSurfaceShader(
  scene: BABYLON.Scene,
  name: string,
  color: BABYLON.Color3,
  intensity: number = 1.0
): BABYLON.ShaderMaterial {
  const shaderMaterial = ShadersController.instance.getShaderMaterial(
    scene,
    "star",
    STAR_VERTEX_SHADER,
    STAR_FRAGMENT_SHADER,
    ["worldViewProjection", "time", "starColor", "intensity", "turbulenceScale", "turbulenceDetail"],
    ["position", "normal", "uv"]
  );
  shaderMaterial.setColor3("starColor", color);
  shaderMaterial.setFloat("intensity", intensity);
  // Set turbulenceScale and turbulenceDetail manually or from StarConfig in the future
  shaderMaterial.setFloat("turbulenceScale", 3.0);
  shaderMaterial.setFloat("turbulenceDetail", 8.0);
  shaderMaterial.backFaceCulling = false;
  scene.registerBeforeRender(() => {
    const t = performance.now() * 0.001;
    shaderMaterial.setFloat("time", t);
  });
  return shaderMaterial;
}
