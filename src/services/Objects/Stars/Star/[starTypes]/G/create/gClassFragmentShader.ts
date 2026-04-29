/**
 * G-class (yellow, Sun-like) star surface fragment shader.
 * Produces warm yellow-orange turbulence with bright granule highlights.
 */
export const gClassFragmentShader = `
  precision highp float;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float time;
  uniform vec3 starColor;
  uniform float intensity;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p);
    f += 0.2500 * noise(p * 2.0);
    f += 0.1250 * noise(p * 4.0);
    f += 0.0625 * noise(p * 8.0);
    return f;
  }

  void main(void) {
    vec3 nrm = normalize(vNormal);
    float t = time * 0.3;

    // Two layers of turbulence at different speeds
    float n1 = fbm(nrm * 3.0 + t);
    float n2 = fbm(nrm * 7.0 - t * 0.8);
    float surface = n1 * 0.65 + n2 * 0.35;

    // G-class palette: white-yellow core → orange → red edge
    vec3 coreColor   = vec3(1.0,  0.97, 0.75);  // white-yellow
    vec3 midColor    = vec3(1.0,  0.80, 0.20);  // golden yellow
    vec3 edgeColor   = vec3(0.85, 0.35, 0.05);  // orange-red

    vec3 color = mix(edgeColor, mix(midColor, coreColor, surface), surface);

    // Blend with custom starColor tint
    color = mix(color, starColor, 0.25);
    color *= 0.85 + 0.45 * surface;
    color *= intensity;

    gl_FragColor = vec4(color, 1.0);
  }
`;
