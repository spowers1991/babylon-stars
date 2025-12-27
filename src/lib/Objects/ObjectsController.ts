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

  protected updateRenderList(newList: Object[]) {
    const MAX_RENDER_OBJECTS = 5; // change this to whatever limit you want

    // Only keep up to MAX_RENDER_OBJECTS
    const limitedList = newList.slice(0, MAX_RENDER_OBJECTS);

    this.objectsToRender = [...limitedList];
    const currentObjects = new Set<any>();

    for (const obj of this.objectsToRender as any) {
        currentObjects.add(obj);
        obj.mesh.setEnabled(true);
    }

    for (const obj of this.objectsToUnrender) {
        if (!currentObjects.has(obj.mesh)) {
            obj.mesh.setEnabled(false);
            obj.mesh.dispose();
        }
    }

    this.objectsToUnrender = currentObjects;
  }

}