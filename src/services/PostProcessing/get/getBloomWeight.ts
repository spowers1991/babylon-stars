// Simple bloom stages based on zoom distance
export function getBloomWeight(zoomLevel: number): number {
    if (zoomLevel > 1000) return 3;
    if (zoomLevel > 800) return 2.5;
    if (zoomLevel > 700) return 2.0;
    if (zoomLevel > 600) return 0.6;
    if (zoomLevel > 500) return 0.5;
    if (zoomLevel > 400) return 0.4;
    if (zoomLevel > 300) return 0.3;
    if (zoomLevel > 200) return 0.2;
    if (zoomLevel > 150) return 1;
    if (zoomLevel > 100) return 0.75;
    if (zoomLevel > 50) return 1;
    if (zoomLevel > 1) return 1.5;
    return 3.5;
}