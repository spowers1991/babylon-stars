import * as BABYLON from "babylonjs";

export interface PCSUpdateOptions {
  activeAlpha?: number;
  inactiveAlpha?: number;
}

export function updatePCS(
  pcs: BABYLON.PointsCloudSystem,
  data: any[],
  options: PCSUpdateOptions = {}
) {
  const { activeAlpha = 1, inactiveAlpha = 0.15 } = options;

  // Loop through all particles
  for (const p of pcs.particles) {
    // Ensure particle has a color object
    if (!p.color) {
      p.color = new BABYLON.Color4(1, 1, 1, inactiveAlpha);
    }

    // Get corresponding data for this particle
    const d = data[p.idx];
    
    if (d && d.emissiveColor) {
      // Apply the color from data
      p.color.r = d.emissiveColor.r;
      p.color.g = d.emissiveColor.g;
      p.color.b = d.emissiveColor.b;
      p.color.a = activeAlpha;
    } else {
      // Fallback color for missing data
      p.color.r = 1;
      p.color.g = 1;
      p.color.b = 1;
      p.color.a = inactiveAlpha;
    }
  }

  pcs.setParticles();
}
