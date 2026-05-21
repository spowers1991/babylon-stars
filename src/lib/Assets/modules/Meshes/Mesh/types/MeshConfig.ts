import { Vector3 } from "babylonjs";

export interface MeshConfig {
  id?: string;
  type: "SphereMesh" | "BoxMesh" | "CylinderMesh" | "PlaneMesh";
  name: string;
  options: {
    position?: Vector3;       // Optional position
    sideOrientation?: number; // e.g., Mesh.DOUBLESIDE
    size?: number;            // For box/plane
    diameter?: number; // For sphere
    diameterTop?: number;     // Cylinder top
    diameterBottom?: number;  // Cylinder bottom
    width?: number;    // For box and plane
    height?: number;   // For box and plane
    depth?: number;    // For box and cylinder
    segments?: number; // For sphere and cylinder
  };
}
