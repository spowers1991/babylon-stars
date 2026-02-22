import * as BABYLON from "babylonjs";
import { SPSConfig } from "../types/SPSConfig";

export function updateSPS(
  sps: BABYLON.SolidParticleSystem,
  data: any[],
  options: SPSConfig = {}
) {
  if (!sps || sps.nbParticles === 0) return;

  const colorById = new Map<number, { r: number; g: number; b: number }>();
  for (const d of data) {
    if (d.K) colorById.set(d.i, d.K);
  }

  for (let i = 0; i < sps.nbParticles; i++) {
    const p = sps.particles[i];

    if (!p.color) {
      p.color = new BABYLON.Color4(1, 1, 1, 0);
    }
    //console.log(data[i].p / 5000)
    const colorData = colorById.get(i);

    if (colorData) {
      p.color.set(
        colorData.r,
        colorData.g,
        colorData.b,
        1
      );
      //p.scaling.setAll(data[i]?.p / 5000 || visibleScale);
    } else {
      p.color.a = 0;
      //p.scaling.setAll(hiddenScale);
    }
  }

  sps.setParticles();
}
