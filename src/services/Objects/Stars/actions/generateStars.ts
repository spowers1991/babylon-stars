import * as BABYLON from "babylonjs";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import stars from "@/data/stars.json";
import { StarConfig } from "../Star/types/StarConfig";
import { createStar } from "../Star/actions/createStar";

const objectsController = new ObjectsController();

export function generateStars(scene: BABYLON.Scene){
    stars.slice(0, 200).map(star => {
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