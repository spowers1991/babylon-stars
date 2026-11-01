export interface StandardMaterialConfig {
  id?: string;
  type: "StandardMaterial";
  name: string;
}

export interface PBRMaterialConfig {
  id?: string;
  type: "PBRMaterial";
  name: string;
}

export type MaterialConfig = StandardMaterialConfig | PBRMaterialConfig;
