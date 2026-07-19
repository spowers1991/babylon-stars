/**
 * Add a shader to the controller's array.
 */
export function setShader(controller: any, shader: any) {
  if (!shader) return;

  const alreadyExists = controller.shaders.some(
    (existing: any) =>
      existing === shader ||
      (existing?.name !== undefined && shader?.name !== undefined && existing.name === shader.name)
  );

  if (!alreadyExists) {
    controller.shaders.push(shader);
  }
}
