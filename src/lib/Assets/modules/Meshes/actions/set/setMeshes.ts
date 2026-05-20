import type { MeshConfig } from '../../Mesh/types/MeshConfig';
import * as BABYLON from 'babylonjs';

/**
 * Groups meshes by their MeshConfig.type into nested arrays.
 * @param configs Array of unknown configs to group
 * @returns Array of [type, meshesOfType[]]
 */
export function setMeshes(configs: any[]): [type: MeshConfig['type'], meshesOfType: BABYLON.AbstractMesh[]][] {
    const meshPoolMap: Record<MeshConfig['type'], BABYLON.AbstractMesh[]> = {
        BoxMesh: [],
        SphereMesh: [],
        CylinderMesh: [],
        PlaneMesh: []
    };

    for (const config of configs) { 
         const type = config.meshType as MeshConfig['type'];
         
         const meshConfig = {
            type: config.meshType || "sphere",
            name: `${config.name || "star"}_mesh`,
            options: {
            diameter: config.diameter || 1,
            },
        } as MeshConfig;

         meshPoolMap[type].push(meshConfig as unknown as BABYLON.AbstractMesh);
    }

    return Object.entries(meshPoolMap) as [type: MeshConfig['type'], meshesOfType: BABYLON.AbstractMesh[]][];
}
