import { RendererConfig } from "../../types/RendererConfig";

export function stepUpdate(config: RendererConfig, deltaMs: number, lastUpdates: Record<string, number>) {
	const elapsed = (lastUpdates[config.id] ?? 0) + deltaMs;
	lastUpdates[config.id] = elapsed;

	if (elapsed < config.interval) {
		return;
	}

	const steps = Math.floor(elapsed / config.interval);
	lastUpdates[config.id] = elapsed - (steps * config.interval);

	for (let i = 0; i < steps; i += 1) {
		config.step();
	}
}
