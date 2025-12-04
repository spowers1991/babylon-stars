import { ObjectsController } from "@/lib/Objects/ObjectsController";
import type { Galaxy } from "./Galaxy/types/Galaxy";

export class GalaxyController extends ObjectsController{
  public galaxies: Galaxy[] = [];

  add(gameObject: Object | Object[]) {
    if (Array.isArray(gameObject)) {
      this.objects.push(...gameObject);
      this.galaxies.push(...gameObject);
    } else {
      this.objects.push(gameObject);
    }
  }

  getByName(name: string) {
    return this.galaxies[name as any];
  }

  getAll() {
    return this.galaxies;
  }
}
