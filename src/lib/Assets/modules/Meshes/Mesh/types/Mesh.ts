import { Vector3 } from "babylonjs";

export type MeshType = "sphere" | "box" | "cylinder" | "plane";

export interface MeshOptions {
  size?: number;            // For box/plane
  diameter?: number;        // For sphere/cylinder
  height?: number;          // For cylinder
  diameterTop?: number;     // Cylinder top
  diameterBottom?: number;  // Cylinder bottom
  segments?: number;        // Sphere or cylinder
  sideOrientation?: number; // e.g., Mesh.DOUBLESIDE
  position?: Vector3;       // Optional position
}
