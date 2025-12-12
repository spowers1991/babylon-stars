export class ObjectsController {
  public objects: Object[] = [];
  public objectsToRender: Object[] = [];

  // Limit for objectsToRender
  protected maxRenderObjects = 10;   // <-- change to whatever you want

  add(gameObject: Object | Object[]) {
    const addOne = (obj: Object) => {
      if (!this.objects.includes(obj)) {
        this.objects.push(obj);
      }
    };

    if (Array.isArray(gameObject)) {
      gameObject.forEach(addOne);
    } else {
      addOne(gameObject);
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

    // enforce max size
    if (this.objectsToRender.length > this.maxRenderObjects) {
      const overflow = this.objectsToRender.length - this.maxRenderObjects;
      this.objectsToRender.splice(0, overflow);
    }

    // ---- LOOP THROUGH THE ARRAY ----
    for (const obj of this.objectsToRender) {
      console.log(obj)
    }
  }
}
