import * as BABYLON from "babylonjs";
import { StarData } from "../types/StarData";

export function createStarPointMap(scene: BABYLON.Scene, stars: StarData[]) {
  const pcs = new BABYLON.PointsCloudSystem("starCloud", 1, scene);

  // Only add stars with valid positions
  const validStars = stars.filter(s => s.x !== null && s.y !== null && s.z !== null);

  pcs.addPoints(validStars.length, (particle: BABYLON.Particle, index: number) => {
    const star = validStars[index];

    particle.position.x = star.x!;
    particle.position.y = star.y!;
    particle.position.z = star.z!;

    const diameter = (star.p ?? 1) / 10;
    (particle as any).diameter = diameter;

    const color = star.K ?? { r: 1, g: 1, b: 1 };
    (particle as any).color = new BABYLON.Color3(color.r, color.g, color.b);
  });

  pcs.buildMeshAsync().then(mesh => {
  const material = new BABYLON.StandardMaterial("starCloudMat", scene);
  material.pointsCloud = true; // THIS IS CRUCIAL
  material.pointSize = 10;
  material.emissiveColor = new BABYLON.Color3(1, 1, 1);
  mesh.material = material;

  mesh.position = BABYLON.Vector3.Zero();
});

return pcs;
}
