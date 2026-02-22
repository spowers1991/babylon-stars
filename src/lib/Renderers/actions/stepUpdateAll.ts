import { stepUpdate } from "./stepUpdate";
import { RendererConfig } from "../types/RendererConfig";

export function stepUpdateAll(renderers: RendererConfig[], lastUpdates: Record<string, number>) {
  for (const config of renderers) {
    stepUpdate(config, lastUpdates);
  }
}
