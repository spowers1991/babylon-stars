import * as BABYLON from "babylonjs";
import type { MeshConfig } from "../../types/MeshConfig";
import { createMeshByType } from "../create/createMeshByType";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function getMesh(scene: BABYLON.Scene, config: MeshConfig) {
    const assetsController = AssetsController.instance;
    const meshFromPool = assetsController.meshes.meshPool.find((mesh) =>
        !mesh.isDisposed() &&
        mesh.getScene() === scene &&
        mesh.metadata?.type === config.type &&
        mesh.name === config.name
    );
    if (meshFromPool) return meshFromPool;

    const newMesh = createMeshByType(scene, config);
    newMesh.metadata = {
        ...(newMesh.metadata ?? {}),
        type: config.type,
        assetPoolType: config.type,
    };
    assetsController.meshes.meshPool.push(newMesh);
    return newMesh;
}