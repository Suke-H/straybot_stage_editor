import { Grid } from "../grid";
import { Panel } from "../panel";
import { CellKey, Cell } from "@/types/cell";
import { NumberGrid } from "@/types/solution";
import { PanelPlacement } from "@/types/panel-placement";

export interface GridState {
  grid: Grid;
  gridHistory: Grid[];
  phaseHistory: Grid[];
}

export interface CellTypeState {
  selectedCellType: CellKey;
}

export interface PanelListState {
  panels: Panel[];
  removedPanels: { panel: Panel; index: number }[];
}

export interface CreatePanelState {
  newPanelGrid: Cell[][];
}

export interface PanelPlacementMode {
  panel: Panel | null;
  highlightedCell: { row: number; col: number } | null;
}

export type PanelPlacementModeType = {
  panel: Panel | null;
  highlightedCell: { row: number; col: number } | null;
};

export interface PanelPlacementState {
  panelPlacementMode: PanelPlacementMode;
}

export enum StudioMode {
  Editor = "editor",
  Play = "play",
  Solver = "solver",
}

export enum StudioModeInEditor {
  Editor = "editor",
  Play = "play",
}

export interface StudioModeState {
  studioMode: StudioMode;
}

export interface StudioModeStateInEditor {
  studioModeInEditor: StudioModeInEditor;
}

export interface SolutionState {
  solutions: PanelPlacement[][];
  currentIndex: number;
  numberGrid: NumberGrid;
}
