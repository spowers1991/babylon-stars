import * as BABYLON from "babylonjs";

export function attachDebugAxis(
  mesh: BABYLON.AbstractMesh,
  size = 5
) {
  const axisX = BABYLON.MeshBuilder.CreateLines("axisX", {
    points: [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(size, 0, 0),
    ],
  });
  axisX.color = BABYLON.Color3.Red();

  const axisY = BABYLON.MeshBuilder.CreateLines("axisY", {
    points: [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, size, 0),
    ],
  });
  axisY.color = BABYLON.Color3.Green();

  const axisZ = BABYLON.MeshBuilder.CreateLines("axisZ", {
    points: [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, 0, size),
    ],
  });
  axisZ.color = BABYLON.Color3.Blue();

  axisX.parent = mesh;
  axisY.parent = mesh;
  axisZ.parent = mesh;
}
