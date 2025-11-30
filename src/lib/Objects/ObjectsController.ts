export class ObjectsController {
  public objects: Object[] = [];

  add(gameObject: Object | Object[]) {
    if (Array.isArray(gameObject)) {
      this.objects.push(...gameObject);
    } else {
      this.objects.push(gameObject);
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
