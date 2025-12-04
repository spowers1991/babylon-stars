export class ObjectsController {
  public objects: Object[] = [];
  public objectsToRender: Object[] = [];

  add(gameObject: Object | Object[]) {

    const addOne = (obj: Object) => {
      if (!this.objects.includes(obj)) {   // optional: enforce unique in base array too
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

  getAll() {
    return this.objects;
  }
}
