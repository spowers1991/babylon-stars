import * as BABYLON from "babylonjs";

export function setObjectsToRender(
  scene: BABYLON.Scene,
  controller: {
    objectsToRender: Object[];
    objectsToUnrender: Set<any>;
    activeObject: Object | null;
  },
  newList: Object[]
) {
    const MAX_RENDER_OBJECTS = 20;

    // Keep only the first N objects
    controller.objectsToRender = newList.slice(0, MAX_RENDER_OBJECTS);

    // Track meshes currently rendered
    const currentMeshes = new Set<any>();

    // Enable current render objects
    for (const obj of controller.objectsToRender as any[]) {
      if (!obj || !obj.mesh) continue;
      currentMeshes.add(obj.mesh);
      obj.mesh.setEnabled(true);  
      if (obj.particleSystem) {
        obj.particleSystem.start();
      }
    }

    // Disable + dispose objects no longer rendered
    for (const obj of controller.objectsToUnrender) {
      if (!obj || !obj.mesh) continue;

      if (!currentMeshes.has(obj.mesh)) {
        obj.mesh.setEnabled(false);
      if (obj.particleSystem) {
          obj.particleSystem.stop();
        }
        obj.mesh.dispose();
      }
    }
    controller.activeObject = controller.objectsToRender[0] || null;
    // Update unrender set correctly
    controller.objectsToUnrender = new Set(controller.objectsToRender);
}
