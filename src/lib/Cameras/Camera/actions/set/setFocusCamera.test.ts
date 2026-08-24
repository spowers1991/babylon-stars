import assert from "node:assert/strict";
import * as BABYLON from "babylonjs";
import { setFocusCamera } from "./setFocusCamera";

function createScene() {
  const engine = new BABYLON.NullEngine();
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 4,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );

  scene.activeCamera = camera;

  return { scene, camera };
}

{
  const { scene, camera } = createScene();
  const startingRadius = camera.radius;

  setFocusCamera(camera, new BABYLON.Vector3(10, 0, 0));

  assert.equal(camera.radius, startingRadius, "focus should preserve the current radius");
  assert.deepEqual(camera.target.asArray(), [10, 0, 0], "focus should retarget the camera immediately");
  assert.equal(scene.activeCamera, camera);
}

{
  const { camera } = createScene();
  const closerTarget = BABYLON.Vector3.Lerp(camera.globalPosition, camera.target, 0.5);
  const startingRadius = camera.radius;

  setFocusCamera(camera, closerTarget);

  assert.equal(camera.radius, startingRadius, "focus should not zoom out or in when retargeting");
  assert.deepEqual(camera.target.asArray(), closerTarget.asArray());
}

console.log("focus camera test passed");
