import ObjectController from "@/lib/Objects/Object/ObjectController";
import * as BABYLON from "babylonjs";
import { attachTextLabel } from "@/utils/attachTextLabel";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export function cloudPointsToData(
  scene: BABYLON.Scene,
  points: BABYLON.Particle[],
  data: any[]
): StarData[] {
  const matchedObjects: StarData[] = [];

  points.forEach(point => {
    const cloudPoint = point as any;
    const idx = cloudPoint.idx;
    
    const objectData = data.find((object: StarData) => object.i === idx);
    if (!data) return;

    const obj = objectData as StarData;
    matchedObjects.push(obj);
  });

  return matchedObjects;
}
