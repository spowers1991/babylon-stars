import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import type { StarData } from "../types/StarData";
import type { StarConfig } from "../Star/types/StarConfig";
import { createStar } from "../Star/actions/createStar";

const objectsController = new ObjectsController();
let i = 0;
export function createStars(scene: BABYLON.Scene, StarData: StarData[]){
    StarData.map(star => {
        i++
        if(i > 200) return
        // Ensure K exists; fallback to white if missing
        const k = star.K ?? { r: 1, g: 1, b: 1 };

        const config: StarConfig = {
        id: star.i,
        name: star.n,
        diameter: (star.p ?? 1) / 10, // 10% of original size
        textureUrl: "texture1.jpg",
        emissiveColor: new BABYLON.Color3(k.r, k.g, k.b),
        emissiveIntensity: 0.25,
        position: new BABYLON.Vector3(
            star.x ?? 0, 
            star.y ?? 0,
            star.z ?? 0
        ),
        };

        const createdStar = createStar(scene, config);
        objectsController.add([createdStar]);
    });
}