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
    visibleScale = 1,
    hiddenScale = 0.001,
    activeAlpha = 1,
    inactiveAlpha = 0.15
  } = options;

  if (!sps || !sps.particles || sps.nbParticles === 0) return;

  // Map: particle index → color
  const colorById = new Map<number, { r: number; g: number; b: number }>();
  for (const d of data) {
    if (d.K) colorById.set(d.i, d.K);
  }

  for (let i = 0; i < sps.nbParticles; i++) {
    const p = sps.particles[i];

    if (!p.color) p.color = new BABYLON.Color4(1, 1, 1, inactiveAlpha);

    const colorData = colorById.get(i);

    if (colorData) {
      // Active particle
      p.color.r = colorData.r;
      p.color.g = colorData.g;
      p.color.b = colorData.b;
      p.color.a = activeAlpha;
      p.isVisible = true;
      p.scaling.setAll(visibleScale);
    } else {
      // Hidden/inactive particle
      p.color.r = 1;
      p.color.g = 1;
      p.color.b = 1;
      p.color.a = inactiveAlpha;
      p.isVisible = false;
      p.scaling.setAll(hiddenScale);
    }
  }

  sps.setParticles();
}
