import * as BABYLON from "babylonjs";
import  { setObjectsToRender as ACTIONS_setObjectsToRender } from "./actions/set/setObjectsToRender";

export class ObjectsController {
  public objects: Object[] = [];
  public activeObject: Object | null = null;
  public objectsToRender: Object[] = [];
  public objectsToUnrender = new Set<any>();

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

  getObjectsToRender() {
    return this.objectsToRender;
  }

  getAll() {
    return this.objects;
  }

  public setObjectsToRender(scene: BABYLON.Scene, newList: Object[]) {
    ACTIONS_setObjectsToRender(scene, this, newList);
  }

}