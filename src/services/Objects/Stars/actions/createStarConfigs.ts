import * as BABYLON from "babylonjs";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";
import { StarsController } from "@/services/Objects/Stars/StarsController";

export function createStarConfigs(scene: BABYLON.Scene, data: StarData[], starsController: StarsController): void {
    data.forEach(i => {
        
         const starConfig: StarConfig = {
            id: i.i,
            name: i.n,
            diameter: (i.p! * 10),
            textureUrl: '',
            emissiveColor: new BABYLON.Color3(i!.K?.r, i!.K?.g, i!.K?.b),
            emissiveIntensity: 1,
            position: new BABYLON.Vector3(i!.x!, i!.y!, i!.z!),
        };

        starsController.addConfig(starConfig)

    })
}