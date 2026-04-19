import { StarData } from "../../types/StarData";

/**
 * Returns the spectral class of a star based on its K.r, K.g, and K.b values.
 * @param starData StarData object containing K.r, K.g, K.b
 * @returns Spectral class as a string ("O", "B", "A", "F", "G", "K", "M", or "Unknown")
 */
export function getSpectralClass(starData: StarData): string {
  if (!starData.K) return "Unknown";
  const { r, g, b } = starData.K;
  // Simple heuristic based on typical star color mapping
  // O: blue, B: blue-white, A: white, F: yellow-white, G: yellow, K: orange, M: red
  if (b > 0.8 && r < 0.5 && g < 0.6) return "O"; // Blue
  if (b > 0.7 && r < 0.7 && g < 0.8) return "B"; // Blue-white
  if (b > 0.6 && r > 0.7 && g > 0.7) return "A"; // White
  if (r > 0.9 && g > 0.8 && b > 0.6) return "F"; // Yellow-white
  if (r > 0.9 && g > 0.8 && b < 0.6) return "G"; // Yellow
  if (r > 0.9 && g < 0.7 && b < 0.5) return "K"; // Orange
  if (r > 0.8 && g < 0.5 && b < 0.4) return "M"; // Red

  return "Unknown";
}
