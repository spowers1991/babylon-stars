export type RendererConfig = {
  id: string;
  name: string;
  interval: number;
  step: () => void;
};
