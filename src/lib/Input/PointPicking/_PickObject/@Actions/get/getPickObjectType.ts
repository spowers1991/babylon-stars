// Checks the type of picked object (Mesh, Particle, etc.)
import * as BABYLON from "babylonjs";

export type PickedObjectType = "Mesh" | "PCSParticle" | "SPSParticle" | "Unknown";

export function getPickObjectType(
  picked: 
    BABYLON.AbstractMesh |
    BABYLON.SolidParticle  |
    BABYLON.CloudPoint |
    BABYLON.PickingInfo  |
    null | 
    undefined
  ): PickedObjectType {
  if (!picked) return "Unknown";

  // Babylon Mesh
  if (picked instanceof BABYLON.Mesh) return "Mesh";

  // PCS Particle
  if ((picked as BABYLON.SolidParticle).hasOwnProperty("_pcs") || (picked as BABYLON.SolidParticle).hasOwnProperty("_pointId")) return "PCSParticle";

  // SPS Particle
  if ((picked as BABYLON.SolidParticle).hasOwnProperty("_sps") || (picked as BABYLON.SolidParticle).hasOwnProperty("_particleId")) return "SPSParticle";

  return "Unknown";
}
