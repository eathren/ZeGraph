export enum LayoutType {
  SEQUENTIAL = "SEQUENTIAL",
  ORGANIC = "ORGANIC",
}

export interface Layout {
  type: LayoutType
  orientation: "TB" | "BT" | "LR" | "RL"
}
