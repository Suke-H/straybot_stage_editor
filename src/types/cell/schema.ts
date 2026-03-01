export type CellKey =
  | "Empty"
  | "Normal"
  | "Start"
  | "Goal"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowDown"
  | "ArrowLeft"
  | "Reverse"
  | "Tele"
  | "Flag"
  | "FootUp"
  | "FootRight"
  | "FootDown"
  | "FootLeft"

export type Cell = { type: CellKey };
