import * as BABYLON from "babylonjs";
import { createShader as ACTIONS_createShader } from "./Shader/actions/create/createShader";
import { getShader as ACTIONS_getShader } from "./Shader/actions/get/getShader";
import { setShaderPool as ACTIONS_setShaderPool } from "./actions/set/setShaderPool";
import { runCleanShaders as ACTIONS_runCleanShaders } from "./actions/run/runCleanShaders";

export class ShadersController {
    public shadersPool: BABYLON.ShaderMaterial[] = [];
    public readonly ownedShaders = new WeakSet<BABYLON.ShaderMaterial>();

    public create(
      scene: BABYLON.Scene,
      name: string,
      vertexShader: string,
      fragmentShader: string,
      uniforms: string[],
      attributes: string[],
      options?: Partial<BABYLON.IShaderMaterialOptions>
    ): BABYLON.ShaderMaterial {
      const existingShader = this.getShader(name, scene);
      if (existingShader) return existingShader;

      const shader = ACTIONS_createShader(
        scene,
        name,
        vertexShader,
        fragmentShader,
        uniforms,
        attributes,
        options
      );
      ACTIONS_setShaderPool(this.shadersPool, shader);
      this.ownedShaders.add(shader);
      this.cleanUp(scene);
      return shader;
    }

    public getShader(name: string, scene?: BABYLON.Scene): BABYLON.ShaderMaterial | undefined {
      return ACTIONS_getShader(this, name, scene);
    }

    public getAll(): BABYLON.ShaderMaterial[] {
      return this.shadersPool;
    }

    public loadByIndex(index: number): BABYLON.ShaderMaterial | undefined {
      return this.shadersPool[index];
    }

    public disposeByIndex(index: number): void {
      const shader = this.shadersPool[index];
      if (shader) {
        shader.dispose();
        this.shadersPool.splice(index, 1);
      }
    }

    public disposeAll(): void {
      this.shadersPool.forEach((shader) => shader.dispose());
      this.shadersPool.length = 0;
    }

    public cleanUp(scene: BABYLON.Scene): void {
      ACTIONS_runCleanShaders(scene, this.shadersPool, this.ownedShaders);
    }
}
