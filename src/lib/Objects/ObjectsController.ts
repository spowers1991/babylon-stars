export class ObjectsController {
  public objects: Object[] = [];
  public objectsToRender: Object[] = [];
  public objectsToUnrender = new Set<any>();

  // Limit for objectsToRender
  protected maxRenderObjects = 10;   // <-- change to whatever you want

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
    this.objectsToRender = [...newList];
    const currentObjects = new Set<any>();

    // enforce max size
    if (this.objectsToRender.length > this.maxRenderObjects) {
      const overflow = this.objectsToRender.length - this.maxRenderObjects;
      this.objectsToRender.splice(0, overflow);
    }

    // ---- LOOP THROUGH THE ARRAY ----
    for (const obj of this.objectsToRender as any) {
      currentObjects.add(obj.mesh);
      obj.mesh.setEnabled(true);
      console.log(obj.mesh)
    }

    for (const mesh of this.objectsToUnrender) {
      if (!currentObjects.has(mesh)) {
        mesh.setEnabled(false);
      }
    }
    console.log(this.objectsToRender)
    this.objectsToUnrender = currentObjects;
  }
}
