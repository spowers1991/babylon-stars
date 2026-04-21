// Simple bloom stages based on zoom distance
export function getBloomWeight(zoomLevel: number): number {
    if (zoomLevel < 100) return 0.5;      // Stage 1: closest
    if (zoomLevel < 200) return 0.1;     // Stage 2
    if (zoomLevel < 400) return 0.03;      // Stage 3
    if (zoomLevel < 600) return 0.05;     // Stage 4
    return 0.1;                            // Stage 5: farthest
}