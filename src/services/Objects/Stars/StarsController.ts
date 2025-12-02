import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { Star } from "./Star/Star";

export class StarsController extends ObjectsController{
  public stars: Star[] = [];

  add(gameObject: Object | Object[]) {
    if (Array.isArray(gameObject)) {
      this.objects.push(...gameObject);
      this.stars.push(...gameObject);
    } else {
      this.objects.push(gameObject);
    }
  }

  getAll() {
    return this.objects;
  }
}
