import * as BABYLON from "babylonjs";

export interface SPSUpdateOptions {
  visibleScale?: number;
  hiddenScale?: number;
  activeAlpha?: number;
  inactiveAlpha?: number;
}

export function updateSPS(
  sps: BABYLON.SolidParticleSystem,
  data: any[],
  options: SPSUpdateOptions = {}
) {
  const {
    visibleScale = 0.25,
    hiddenScale = 0.05,
    activeAlpha = 1,
    inactiveAlpha = 0
  } = options;

  if (!sps || sps.nbParticles === 0) return;

  const colorById = new Map<number, { r: number; g: number; b: number }>();
  for (const d of data) {
    if (d.K) colorById.set(d.i, d.K);
  }

  for (let i = 0; i < sps.nbParticles; i++) {
    const p = sps.particles[i];

    if (!p.color) {
      p.color = new BABYLON.Color4(1, 1, 1, inactiveAlpha);
    }
    //console.log(data[i].p / 5000)
    const colorData = colorById.get(i);

    if (colorData) {
      p.color.set(
        colorData.r,
        colorData.g,
        colorData.b,
        activeAlpha
      );
      //p.scaling.setAll(data[i]?.p / 5000 || visibleScale);
    } else {
      p.color.a = inactiveAlpha;
      //p.scaling.setAll(hiddenScale);
    }
  }

  sps.setParticles();
}
