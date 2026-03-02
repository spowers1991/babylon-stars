import type { PointData } from "../../types/PointData";

function isValidData(s: any): s is any & { x: number; y: number; z: number } {
  return s.x != null && s.y != null && s.z != null;
}

export function setPointData(data: any[]): PointData[] {
  return data
    .filter(isValidData)
    .map(data => ({
      x: data.x,
      y: data.y,
      z: data.z,
    }));
}