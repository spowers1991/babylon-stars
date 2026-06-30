import * as BABYLON from "babylonjs";
import { SPSConfig } from "../../types/SPSConfig";
import { setStarSize } from "@/services/Objects/Stars/Star/actions/set/setStarSize";

export function setSPS(
  sps: BABYLON.SolidParticleSystem,
  data: any[],
  options: SPSConfig = {}
) {
  if (!sps || sps.nbParticles === 0) return;

  const particleById = new Map<number, { r: number; g: number; b: number }>();
  for (const d of data) {
    if (d.K) particleById.set(d.i, d.K);
  }

  const luminosityById = new Map<number, { N: number }>();
  for (const d of data) {
    if (d.N) luminosityById.set(d.i, d.N);
  }

  for (let i = 0; i < sps.nbParticles; i++) {
    const p = sps.particles[i];
    const sourceId = data[i]?.i;

    if (!p.color) {
      p.color = new BABYLON.Color4(1, 1, 1, options.transparency !== undefined ? options.transparency : 1);
    }
    //console.log(data[i].p / 5000)
    const particle = sourceId !== undefined ? particleById.get(sourceId) : undefined;

    const luminosityData = sourceId !== undefined ? luminosityById.get(sourceId) : undefined;

    if (particle) {
      p.color.set(
        options.color ? options.color.r : particle.r,
        options.color ? options.color.g : particle.g,
        options.color ? options.color.b : particle.b,
        options.transparency !== undefined ? options.transparency : luminosityData ? luminosityData.N : 1
      );
    } else {
      p.color.a = 0;
    }
    p.scaling.setAll(setStarSize(data[i]?.N) / 2);
  }

  sps.setParticles();
}
