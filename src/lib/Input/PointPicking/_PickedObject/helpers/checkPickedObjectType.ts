// Checks the type of picked object (Mesh, Particle, etc.)
import * as BABYLON from "babylonjs";

export type PickedObjectType = "Mesh" | "PCSParticle" | "SPSParticle" | "Unknown";

export function checkPickedObjectType(picked: any): PickedObjectType {
  if (!picked) return "Unknown";

  // Babylon Mesh
  if (picked instanceof BABYLON.Mesh) return "Mesh";

  // PCS Particle
  if (picked.hasOwnProperty("_pcs") || picked.hasOwnProperty("_pointId")) return "PCSParticle";

  // SPS Particle
  if (picked.hasOwnProperty("_sps") || picked.hasOwnProperty("_particleId")) return "SPSParticle";

  return "Unknown";
}
