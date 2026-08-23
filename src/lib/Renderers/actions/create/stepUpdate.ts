import { RendererConfig } from "../../types/RendererConfig";

export function stepUpdate(config: RendererConfig, deltaMs: number, lastUpdates: Record<string, number>) {
	const elapsed = (lastUpdates[config.id] ?? 0) + deltaMs;
	lastUpdates[config.id] = elapsed;

	if (elapsed < config.interval) {
		return;
	}

	lastUpdates[config.id] = elapsed % config.interval;
	config.step();
}
