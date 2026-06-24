import type { MeshConfig } from '../../Mesh/types/MeshConfig';
import * as BABYLON from 'babylonjs';

/**
 * Groups meshes by their MeshConfig.type into nested arrays.
 * @param configs Array of unknown configs to group
 * @returns Array of [type, meshConfigs[]]
 */
export function setMeshConfigs(configs: any[]): [type: MeshConfig['type'], meshConfigs: MeshConfig[]][] {
    const meshPoolMap: Record<MeshConfig['type'], MeshConfig[]> = {
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

        meshPoolMap[type].push(meshConfig);
    }

    return Object.entries(meshPoolMap) as [type: MeshConfig['type'], meshConfigs: MeshConfig[]][];
}
