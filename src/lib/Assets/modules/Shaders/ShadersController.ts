import * as BABYLON from "babylonjs";
import { createShaderMaterial } from "./Shader/create/createShaderMaterial";
import { getShaderByName as getShaderByNameAction } from "./Shader/get/getShaderByName";
import { setShader as setShaderAction } from "./Shader/set/setShader";

export class ShadersController {
  static instance: ShadersController = new ShadersController();
  shaders: any[] = [];

    /**
     * Returns a ShaderMaterial for the given shader code and config.
     */
    public getShaderMaterial(
    scene: BABYLON.Scene,
    name: string,
    vertexShader: string,
    fragmentShader: string,
    uniforms: string[],
    attributes: string[],
    options?: Partial<BABYLON.IShaderMaterialOptions>
    ): BABYLON.ShaderMaterial {
    return createShaderMaterial(scene, name, vertexShader, fragmentShader, uniforms, attributes, options);
    }

    /**
     * Add a shader to the controller's array.
     */
    public setShader(shader: any) {
    setShaderAction(this, shader);
    }

    /**
     * Get a shader by name from the controller's array.
     */
    public getShaderByName(name: string) {
    return getShaderByNameAction(this, name);
    }

    public getAll(): unknown[] {
        return this.shaders;
    }
  
  
    public loadByIndex(index: number): unknown {
        const shader = this.shaders[index];
        return shader;
    }

    public disposeByIndex(index: number): void {
        const shader = this.shaders[index];
        if (shader) {
        shader.dispose();
        this.shaders.splice(index, 1);
        }
    }

    public disposeAll(): void {
        this.shaders.forEach(shader => shader.dispose());
        this.shaders = [];
    }
}
