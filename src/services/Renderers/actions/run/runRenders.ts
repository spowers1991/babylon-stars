import * as BABYLON from "babylonjs";

export function runRenders(scene: BABYLON.Scene) {
    return () => scene.render();
}