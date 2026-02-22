import { RendererConfig } from "../types/RendererConfig";

export function stepUpdate(config: RendererConfig, lastUpdates: Record<string, number>) {
	const now = performance.now();
	const last = lastUpdates[config.id] ?? 0;
	if (now - last > config.interval) {
		config.step();
		lastUpdates[config.id] = now;
	}
}
