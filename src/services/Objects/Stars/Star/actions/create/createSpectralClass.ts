import { StarData } from "../../types/StarData";
import { getSpectralClass } from "../get/getSpectralClass";

/**
 * Returns the spectral class for a given StarData.
 * This is a wrapper for getSpectralClass, placed in actions/create for consistency.
 * @param starData StarData object
 * @returns Spectral class string
 */
export function createSpectralClass(starData: StarData): string {
  const spectralClass = getSpectralClass(starData as StarData);
  return spectralClass;
}
