// Centralized star/particle size logic
export function setStarSize(p: number): number {
  // Example: scale for visibility, adjust as needed

  const minSize = 1; // minimum size for very small stars
  const maxSize = 100;    // maximum size for very large stars
    if (p <= 0) return minSize;
  const size = p / 1000;
  return Math.min(Math.max(size, minSize), maxSize);
}
