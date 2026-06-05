import * as BABYLON from "babylonjs";
import { MeshConfig } from "../../Mesh/types/MeshConfig";
import { createMeshByType } from "@/lib/Assets/modules/Meshes/Mesh/actions/create/createMeshByType";

export function setMeshPool(scene: BABYLON.Scene, meshConfigs: [type: "BoxMesh" | "CylinderMesh" | "PlaneMesh" | "SphereMesh", meshConfigs: MeshConfig[]][]): BABYLON.AbstractMesh[] {
    
    const currentMeshes: Set<BABYLON.AbstractMesh> = new Set();

    if(meshConfigs.length > 0) {
        for (let i = 0; i < meshConfigs.length ; i++) {
            const [type, configs] = meshConfigs[i];
            configs.forEach((config) => {
                const mesh = createMeshByType(scene, config);
                mesh.metadata = {
                    ...(mesh.metadata ?? {}),
                    type,
                };
                currentMeshes.add(mesh);
            });
        }
    }
    
    return Array.from(currentMeshes);
}