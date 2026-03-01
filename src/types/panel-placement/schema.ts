import { Vector } from '../path';
import { Panel } from '../panel';
import { Grid } from '../grid';

export type PanelPlacement = {
  panel: Panel;
  highlight: Vector;
  point: Vector;
};

export interface PhaseGrids {
  before: Grid;
  after: Grid;
}

export interface PhasedSolution {
  phases: PanelPlacement[][];
  phaseHistory: Grid[];
  phaseGrids: PhaseGrids[];
}
