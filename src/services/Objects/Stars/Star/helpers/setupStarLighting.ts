import * as BABYLON from "babylonjs";

/**
 * Creates a soft hemispheric light for the star.
 */
export function setupStarLighting(scene: BABYLON.Scene, name: string) {
  const lightName = `${name}-light`;
  new BABYLON.HemisphericLight(lightName, new BABYLON.Vector3(0.1, 0.1, 0), scene);
}
