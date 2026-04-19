import * as BABYLON from "babylonjs";

/**
 * Add a shader to the controller's array.
 */
export function setShader(controller: any, shader: any) {
  controller.shaders.push(shader);
}
