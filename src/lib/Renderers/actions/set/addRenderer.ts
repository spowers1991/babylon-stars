import { RendererConfig } from "../../types/RendererConfig";

export function addRenderer(renderers: RendererConfig[], config: RendererConfig) {
  if (renderers.some(r => r.id === config.id)) {
    return;
  }
  renderers.push(config);
}