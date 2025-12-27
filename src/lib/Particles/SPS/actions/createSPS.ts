import * as BABYLON from "babylonjs";
import type { PointData } from "../../PCS/types/PointData";
import { convertToPointData } from "../../PCS/actions/convertToPointData";

export interface CreateSPSOptions {
  diameter?: number; // template mesh diameter
  onInitParticle?: (particle: BABYLON.SolidParticle, data?: PointData) => void;
}

export async function createSPS(
  scene: BABYLON.Scene,
  data: any[],
  name: string,
  options: CreateSPSOptions = {}
): Promise<BABYLON.SolidParticleSystem> {
  const { diameter = 0.5, onInitParticle } = options;

  // Convert data to PointData (positions + color)
  const pointData: PointData[] = convertToPointData(data);

  // 1️⃣ Create a template mesh (a small sphere)
  const template = BABYLON.MeshBuilder.CreateSphere(`${name}_template`, { diameter }, scene);
  template.isVisible = false;

  // 2️⃣ Create SPS
  const sps = new BABYLON.SolidParticleSystem(name, scene, { updatable: true });

  // 3️⃣ Add particles
  sps.addShape(template, pointData.length);

  // 4️⃣ Initialize particles
  for (let i = 0; i < sps.nbParticles; i++) {
    const particle = sps.particles[i];
    const p = pointData[i];

    // Set position
    particle.position.set(p.x, p.y, p.z);

    // Set color
    if (p.color) {
      particle.color = new BABYLON.Color4(p.color.r, p.color.g, p.color.b, 1);
    } else {
      particle.color = new BABYLON.Color4(1, 1, 1, 1);
    }

    // Optional user callback
    if (onInitParticle) {
      onInitParticle(particle, p);
    }
  }

  // 5️⃣ Build mesh
  sps.buildMesh();

  // Dispose template
  template.dispose();

  return sps;
}
