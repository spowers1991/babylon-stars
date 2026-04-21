export interface PipelineConfig {
  name?: string;
  bloomEnabled?: boolean;
  bloomThreshold?: number;
  bloomWeight?: number;
  bloomKernel?: number;
  bloomScale?: number;
  fxaaEnabled?: boolean;
}