export type CellKey =
  | "Empty"
  | "White"
  | "Black"
  | "Swap"
  | "Start"
  | "Goal"
  | "DummyGoal"
  | "Crow"
  | "Wolf"
  | "Trauma"
  | "Rest"
  | "FootUp"
  | "FootRight"
  | "FootDown"
  | "FootLeft"
  | "Flag"

export type Cell = { type: CellKey };
