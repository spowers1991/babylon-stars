import { RendererConfig } from "../types/RendererConfig";

export function logRenderers(renderers: RendererConfig[]) {
  console.log("Registered RendererConfigs:", renderers);
}
