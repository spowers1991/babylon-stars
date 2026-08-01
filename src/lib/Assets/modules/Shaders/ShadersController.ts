import * as BABYLON from "babylonjs";
import { createShaderMaterial as ACTIONS_createShaderMaterial} from "./Shader/create/createShaderMaterial";
import { getShaderByName as  ACTIONS_getShaderByNameAction } from "./Shader/get/getShaderByName";
import { setShader as ACTIONS_setShaderAction } from "./Shader/set/setShader";

export class ShadersController {
  static instance: ShadersController = new ShadersController();
  shaders: any[] = [];

    public create(
        scene: BABYLON.Scene,
        name: string,
        vertexShader: string,
        fragmentShader: string, 
        uniforms: string[],
        attributes: string[],
        options?: Partial<BABYLON.IShaderMaterialOptions>
    ): BABYLON.ShaderMaterial {
        const shader = ACTIONS_createShaderMaterial(scene, name, vertexShader, fragmentShader, uniforms, attributes, options);
        this.setShader(shader);
        return shader;
    }

    /**
     * Add a shader to the controller's array.
     */
    public setShader(shader: any) {
        ACTIONS_setShaderAction(this, shader);
    }

    /**
     * Get a shader by name from the controller's array.
     */
    public getShaderByName(name: string) {
        return ACTIONS_getShaderByNameAction(this, name);
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
