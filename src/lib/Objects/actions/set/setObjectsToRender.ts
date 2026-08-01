import * as BABYLON from "babylonjs";

export function setObjectsToRender(
  scene: BABYLON.Scene,
  controller: {
    objectsToRender: Object[];
    objectsToUnrender: Set<any>;
    activeObject: Object | null;
    objectsPool: Map<string, any>;
  },
  newList: Object[]
) {
  const MAX_RENDER_OBJECTS = 50;

  const previousObjects = new Set(controller.objectsToRender as any[]);
  const nextObjects: any[] = [];
  const currentObjects = new Set<any>();

  const getObjectKey = (obj: any, index: number): string => {
    if (obj?.id !== undefined && obj?.id !== null) {
      return `id::${String(obj.id)}`;
    }

    if (obj?.name) {
      return `name::${String(obj.name)}`;
    }

    if (obj?.mesh?.name) {
      return `mesh::${String(obj.mesh.name)}`;
    }

    return `fallback::${index}`;
  };

  const disposeObjectResources = (obj: any): void => {
    if (!obj) {
      return;
    }

    if (obj.particleSystem) {
      obj.particleSystem.stop();
      obj.particleSystem.dispose?.();
    }

    obj.texture?.dispose?.();
    obj.material?.dispose?.();
    obj.mesh?.dispose?.();
  };

  const requestedObjects = newList.slice(0, MAX_RENDER_OBJECTS) as any[];

  requestedObjects.forEach((candidate, index) => {
    if (!candidate) {
      return;
    }

    const key = getObjectKey(candidate, index);
    const pooled = controller.objectsPool.get(key);
    const renderObject = pooled ?? candidate;

    if (!pooled) {
      controller.objectsPool.set(key, candidate);
    } else if (pooled !== candidate) {
      // The pool already owns this logical object, so release the duplicate candidate.
      disposeObjectResources(candidate);
    }

    if (renderObject.mesh) {
      renderObject.mesh.setEnabled(true);
    }

    if (renderObject.particleSystem) {
      renderObject.particleSystem.start();
    }

    currentObjects.add(renderObject);
    nextObjects.push(renderObject);
  });

  for (const obj of previousObjects) {
    if (!obj || currentObjects.has(obj)) {
      continue;
    }

    if (obj.mesh) {
      obj.mesh.setEnabled(false);
    }

    if (obj.particleSystem) {
      obj.particleSystem.stop();
    }
  }

  controller.objectsToRender = nextObjects;
  controller.activeObject = controller.objectsToRender[0] || null;
  controller.objectsToUnrender = new Set(controller.objectsToRender);
}