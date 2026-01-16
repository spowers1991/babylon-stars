import * as BABYLON from "babylonjs";
import type { PointData } from "../../PCS/types/PointData";
import { convertToPointData } from "../../PCS/actions/convertToPointData";
import type { ParticleOptionsSPS } from "../types/ParticleOptionsSPS";

export async function createSPS(
  scene: BABYLON.Scene,
  data: any[],
  name: string,
  options: ParticleOptionsSPS = {}
): Promise<BABYLON.SolidParticleSystem> {

  const { diameter = 1, onInitParticle } = options; // smaller size to start
  const pointData: PointData[] = convertToPointData(data);
  const count = Math.min(500, pointData.length);

  // Template mesh
  const template = BABYLON.MeshBuilder.CreateSphere(`${name}_template`, { diameter, segments: 4 }, scene);
  template.isVisible = false; // hide template

  // Create SPS
  const sps = new BABYLON.SolidParticleSystem(name, scene, { updatable: true });
  sps.addShape(template, count);

  // Initialize particle positions and colors
  for (let i = 0; i < count; i++) {
    const particle = sps.particles[i];
    const p = pointData[i];
    if (!p) continue; // safety

    particle.position.set(p.x, p.y, p.z);
    particle.color = p.color
      ? new BABYLON.Color4(p.color.r, p.color.g, p.color.b, 1)
      : new BABYLON.Color4(1, 1, 1, 1);

    if (onInitParticle) onInitParticle(particle, data[i] ?? p);
  }

  // Build mesh
  sps.buildMesh();
  sps.setParticles();

  // Material that shows particle colors
  const mat = new BABYLON.StandardMaterial(`${name}_mat`, scene);
  mat.disableLighting = true;        // optional
  mat.emissiveColor = BABYLON.Color3.White();
  sps.mesh!.material = mat;

  template.dispose();

  return sps;
}
