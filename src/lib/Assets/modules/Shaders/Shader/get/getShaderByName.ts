
export function getShaderByName(controller: any, name: string) {
  return controller.shaders.find((shader: any) => shader.name === name);
}
