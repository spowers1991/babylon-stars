export class ObjectsController {
  public objects: Object[] = [];
  public objectsToRender: Object[] = [];
  public objectsToUnrender = new Set<any>();

  // Limit for objectsToRender
  protected maxRenderObjects = 5;   // <-- change to whatever you want

  add(object: Object | Object[]) {
    const addOne = (obj: Object) => {
      if (!this.objects.includes(obj)) {
        this.objects.push(obj);
      }
    };

    if (Array.isArray(object)) {
      object.forEach(addOne);
    } else {
      addOne(object);
    }
  }

  update(deltaTime: number) {
    this.objects.forEach(obj => {
      // obj.mesh.rotation.y += 0.0005 * deltaTime;
    });
  }

  getObjectsToRender() {
    return this.objectsToRender;
  }

  getAll() {
    return this.objects;
  }

  /**
   * Replace or append items to the render list in a safe way.
   * Applies max size limits and removes oldest items.
   */

  public updateObjectToRender(newList: Object[]) {
    const MAX_RENDER_OBJECTS = 20;

    // Keep only the first N objects
    this.objectsToRender = newList.slice(0, MAX_RENDER_OBJECTS);

    // Track meshes currently rendered
    const currentMeshes = new Set<any>();

    // Enable current render objects
    for (const obj of this.objectsToRender as any[]) {
      if (!obj || !obj.mesh) continue;
      currentMeshes.add(obj.mesh);
      obj.mesh.setEnabled(true);
    }

    // Disable + dispose objects no longer rendered
    for (const obj of this.objectsToUnrender) {
      if (!obj || !obj.mesh) continue;

      if (!currentMeshes.has(obj.mesh)) {
        obj.mesh.setEnabled(false);
        obj.mesh.dispose();
      }
    }

    // Update unrender set correctly
    this.objectsToUnrender = new Set(this.objectsToRender);
  }

}