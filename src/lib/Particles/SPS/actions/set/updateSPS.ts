import * as BABYLON from "babylonjs";
import { SPSConfig } from "../../types/SPSConfig";

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

  const luminosityById = new Map<number, { N: number }>();
  for (const d of data) {
    if (d.N) luminosityById.set(d.i, d.N);
  }

  for (let i = 0; i < sps.nbParticles; i++) {
    const p = sps.particles[i];

    if (!p.color) {
      p.color = new BABYLON.Color4(1, 1, 1, options.transparency !== undefined ? options.transparency : 1);
    }
    //console.log(data[i].p / 5000)
    const colorData = colorById.get(i);

    const luminosityData = luminosityById.get(i);

    if (colorData) {
      p.color.set(
        options.color ? options.color.r : colorData.r,
        options.color ? options.color.g : colorData.g,
        options.color ? options.color.b : colorData.b,
        options.transparency !== undefined ? options.transparency : luminosityData ? luminosityData.N : 1
      );
    } else {
      p.color.a = 0;
    }
  }

  sps.setParticles();
}
