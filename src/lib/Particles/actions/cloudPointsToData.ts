import ObjectController from "@/lib/Objects/Object/ObjectController";
import * as BABYLON from "babylonjs";

export function cloudPointsToData(scene: BABYLON.Scene, points: BABYLON.Particle[], objectsData: any): any[] {
    const matchedObjects: ObjectController[] = [];

    points.forEach(point => {
        const cloudPoint = point as any;  // CloudPoint
        const idx = cloudPoint.idx;

        // Find star data with matching index
        const data = objectsData.find((object: any) => object.i === idx);

        // Save matched star
        matchedObjects.push(data);
    });

    // ✅ Return the array after processing all points
    return matchedObjects;
}
