export const starVertexShader = `
  precision highp float;
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec2 uv;
  uniform mat4 worldViewProjection;
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main(void) {
    vPosition = position;
    vNormal = normalize(normal);
    gl_Position = worldViewProjection * vec4(position, 1.0);
  }
`;