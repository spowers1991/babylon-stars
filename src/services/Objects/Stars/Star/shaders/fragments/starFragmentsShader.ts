export const starFragmentShader = `
  precision highp float;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float time;
  uniform vec3 starColor;
  uniform float intensity;
  uniform float darkPatchStrength;
  uniform float lineStrength;

  // 3D hash and noise
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    float n = dot(i, vec3(1.0, 57.0, 113.0));
    float res = mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    return res;
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
    // Use normal for seamless wrapping
    vec3 nrm = normalize(vNormal);
    float t = time * 0.5;
    float n = fbm(nrm * 3.0 + t);
    float n2 = fbm(nrm * 8.0 - t * 1.5);
    float surface = n * 0.7 + n2 * 0.3;

    // Ridged turbulence creates darker active patches.
    float patchNoise = fbm(nrm * 5.5 + vec3(t * 0.6, -t * 0.35, t * 0.45));
    float ridged = 1.0 - abs(2.0 * patchNoise - 1.0);
    float darkPatches = smoothstep(0.45, 0.95, ridged) * darkPatchStrength;

    // Warped trigonometric bands create crack-like dark flow lines.
    float lineWarp = fbm(nrm * 10.0 + vec3(t * 1.2, -t * 0.8, t * 0.9));
    float lines = abs(sin((nrm.y + lineWarp * 0.35 + t * 0.45) * 42.0));
    float darkLines = smoothstep(0.65, 0.98, lines) * lineStrength;

    float darkness = clamp(darkPatches + darkLines, 0.0, 0.92);
    float emissiveMask = 1.0 - darkness;

    vec3 color = starColor;
    color *= (0.65 + 0.85 * surface) * intensity;
    color *= emissiveMask;
    color = max(color, starColor * 0.02);

    gl_FragColor = vec4(color, 1.0);
  }
`;