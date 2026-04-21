import * as BABYLON from "babylonjs";

/**
 * G-class (yellow, Sun-like) star emission texture.
 * Procedurally generated using DynamicTexture so no image file is required.
 * Drop a real emission.jpg into public/textures/stars/classes/g/ to replace this.
 */
export function createGEmissionTexture(
    scene: BABYLON.Scene,
    name: string
): BABYLON.DynamicTexture {
    const SIZE = 256;
    const texture = new BABYLON.DynamicTexture(`${name}_g_emission`, SIZE, scene, false);
    const ctx = texture.getContext() as CanvasRenderingContext2D;

    // Base yellow-orange gradient radiating from center
    const gradient = ctx.createRadialGradient(
        SIZE / 2, SIZE / 2, SIZE * 0.05,
        SIZE / 2, SIZE / 2, SIZE * 0.55
    );
    gradient.addColorStop(0.0, "#fff8c0");   // bright white-yellow core
    gradient.addColorStop(0.3, "#ffcc00");   // yellow mid
    gradient.addColorStop(0.6, "#ff8800");   // orange outer
    gradient.addColorStop(1.0, "#cc3300");   // deep red edge

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Add granulation noise spots (solar granules)
    for (let i = 0; i < 120; i++) {
        const x = Math.random() * SIZE;
        const y = Math.random() * SIZE;
        const r = 4 + Math.random() * 10;
        const brightness = 0.6 + Math.random() * 0.4;
        const alpha = 0.15 + Math.random() * 0.2;

        const spot = ctx.createRadialGradient(x, y, 0, x, y, r);
        spot.addColorStop(0, `rgba(255, 240, 180, ${alpha})`);
        spot.addColorStop(1, `rgba(255, 140, 0, 0)`);

        ctx.fillStyle = spot;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    texture.update();
    texture.hasAlpha = false;
    return texture;
}
