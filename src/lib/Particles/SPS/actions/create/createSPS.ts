import * as BABYLON from "babylonjs";
import type { PointData } from "../../../PCS/types/PointData";
import { setPointData } from "../../../PCS/actions/set/setPointData";
import type { SPSConfig } from "../../types/SPSConfig";
import { setStarSize } from "@/services/Objects/Stars/Star/actions/set/setStarSize";

export async function createSPS(
  scene: BABYLON.Scene,
  data: any[],
  name: string,
  options: SPSConfig = {}
): Promise<BABYLON.SolidParticleSystem> {

  const { diameter = 1, onInitParticle } = options; // smaller size to start
  const pointData: PointData[] = setPointData(data);
  const count = Math.min(10000, pointData.length);

  // Template mesh
  const template = BABYLON.MeshBuilder.CreateSphere(`${name}_template`, { diameter, segments: 1 }, scene);
  template.isVisible = false; // hide template

  // Create SPS
  const sps = new BABYLON.SolidParticleSystem(name, scene, { updatable: true });
  sps.addShape(template, count);

  // Initialize particle positions and colors
  for (let i = 0; i < count; i++) {
    const particle = sps.particles[i];
    const p = pointData[i];
    if (!p) continue;
    // Use the same size logic as Star
    const d = setStarSize(data[i]?.p);
    // If you want to use diameter as scale, setAll(d / diameter)
    particle.scaling.setAll(d / diameter);
    particle.position.set(p.x * 10, p.y * 10, p.z * 10);
    particle.color = p.color
      ? new BABYLON.Color4(p.color.r, p.color.g, p.color.b, 1)
      : new BABYLON.Color4(1, 1, 1, 1);

    if (onInitParticle) onInitParticle(particle, data[i] ?? p);
  }

  // Build mesh
  sps.buildMesh();

  // Material that shows particle colors
  const mat = new BABYLON.StandardMaterial(`${name}_mat`, scene);
  mat.disableLighting = true;        // optional
  mat.emissiveColor = BABYLON.Color3.White();
  sps.mesh!.material = mat;
  sps.mesh!.alwaysSelectAsActiveMesh = true;

  template.dispose();

  return sps;
}
