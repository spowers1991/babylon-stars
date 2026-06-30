import type { StarConfig } from "../../types/StarConfig";

export function setStarSize(diameter: number | null | undefined, boost = 1): number {
  // Keep the existing linear feel, with optional small boost for mesh visibility.

  const minSize = 0.01; // allow smaller stars so sizes do not collapse to one value
  const maxSize = 1; // cap very large stars to avoid oversized meshes
  if (diameter == null || diameter <= 0) return minSize;
  const size = (diameter);
  return Math.min(Math.max(size, minSize), maxSize);
}
