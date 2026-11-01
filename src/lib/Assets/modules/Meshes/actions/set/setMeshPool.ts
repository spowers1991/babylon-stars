import * as BABYLON from "babylonjs";
import { MeshConfig } from "../../Mesh/types/MeshConfig";
import { createMeshByType } from "@/lib/Assets/modules/Meshes/Mesh/actions/create/createMeshByType";
import { runCleanMeshes } from "../run/runCleanMeshes";

export function setMeshPool(scene: BABYLON.Scene, meshConfigs: [type: "BoxMesh" | "CylinderMesh" | "PlaneMesh" | "SphereMesh", meshConfigs: MeshConfig[]][], meshPool: BABYLON.AbstractMesh[]): BABYLON.AbstractMesh[] {
    const currentMeshes: Set<BABYLON.AbstractMesh> = new Set();
    const existingMeshesByKey: Map<string, BABYLON.AbstractMesh> = new Map();

    meshPool.forEach((mesh) => {
        const meshType = mesh.metadata?.type;
        if (
            typeof meshType === "string" &&
            !mesh.isDisposed() &&
            mesh.getScene() === scene
        ) {
            existingMeshesByKey.set(`${meshType}::${mesh.name}`, mesh);
        }
    });

    if(meshConfigs.length > 0) {
        for (let i = 0; i < meshConfigs.length ; i++) {
            const [type, configs] = meshConfigs[i];
            configs.forEach((config) => {
                const meshKey = `${type}::${config.name}`;
                let mesh = existingMeshesByKey.get(meshKey);

                if (!mesh) {
                    mesh = createMeshByType(scene, config);
                    mesh.metadata = {
                        ...(mesh.metadata ?? {}),
                        type,
                        assetPoolType: type,
                    };
                    existingMeshesByKey.set(meshKey, mesh);
                }

                currentMeshes.add(mesh);
            });
        }
    }

    const updatedMeshPool = Array.from(currentMeshes);
    runCleanMeshes(scene, updatedMeshPool);
    
    return updatedMeshPool;
}