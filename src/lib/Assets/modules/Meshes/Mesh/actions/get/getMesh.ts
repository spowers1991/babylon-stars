import * as BABYLON from "babylonjs";
import type { MeshConfig } from "../../types/MeshConfig";
import { createMeshByType } from "../create/createMeshByType";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function getMesh(scene: any, config: MeshConfig) {
    const assetsController = AssetsController.instance;

    if(assetsController.meshes.meshPool.length > 0) {
        const meshFromPool = assetsController.meshes.meshPool.find(mesh => {
            return mesh.metadata?.type === config.type && mesh.name === config.name;
        });
        if(meshFromPool) {
            return meshFromPool;
        }
        else {
            const newMesh = createMeshByType(scene, config);
            newMesh.metadata = {
                ...(newMesh.metadata ?? {}),
                type: config.type,
            };
            assetsController.meshes.meshPool.push(newMesh);
            return newMesh;
        }
    }
}   