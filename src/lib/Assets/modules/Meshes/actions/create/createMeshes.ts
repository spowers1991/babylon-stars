import type { MeshConfig } from '../../Mesh/types/MeshConfig';
import * as BABYLON from 'babylonjs';
import { AssetsController } from '@/lib/Assets/AssetsController';
import { setMeshes } from '../set/setMeshes';

/**
 * Creates one instance of each main Babylon mesh type and groups them by type.
 * @param scene The Babylon scene
 * @returns Array of [type, meshesOfType[]]
 */
export function createMeshes(scene: BABYLON.Scene): [type: MeshConfig['type'], meshConfigs: MeshConfig[]][] {
  const meshesController = AssetsController.instance.meshes;
  // Define main Babylon mesh types and minimal configs
  const meshConfigs: MeshConfig[] = [
    { type: 'BoxMesh', name: 'box', options: { size: 1 } },
    { type: 'SphereMesh', name: 'sphere', options: { diameter: 1 } },
    { type: 'CylinderMesh', name: 'cylinder', options: { height: 1, diameter: 1 } },
    { type: 'PlaneMesh', name: 'plane', options: { size: 1 } },
    // Only allowed types per MeshConfig
  ];
  
  const currentMeshes: BABYLON.AbstractMesh[] = [];
  for (const config of meshConfigs) {
    const mesh = meshesController.create(scene, config);
    currentMeshes.push(mesh);
  }

  return setMeshes(currentMeshes);
}
