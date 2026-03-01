import { Grid } from '@/types/grid';
import { Panel } from '@/types/panel/schema';
import { PanelPlacement } from '@/types/panel-placement';
import { deepCopyGrid } from './utils';
import { getStrategy } from './panel-strategies';

export const canPlaceSinglePanel = (grid: Grid, placement: PanelPlacement): boolean => {
  const { panel, highlight, point } = placement;
  const topLeftX = point.x - highlight.x;
  const topLeftY = point.y - highlight.y;
  return canPlacePanelAt(grid, topLeftY, topLeftX, panel);
};

export const canPlacePanelAt = (
  grid: Grid,
  rowIdx: number,
  colIdx: number,
  panel: Panel
): boolean => {
  const panelRows = panel.cells.length;
  const panelCols = panel.cells[0].length;
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  if (rowIdx < 0 || colIdx < 0 ||
      colIdx + panelCols > gridCols ||
      rowIdx + panelRows > gridRows) {
    return false;
  }

  const strategy = getStrategy(panel.type);
  return strategy.canPlace(grid, rowIdx, colIdx, panel);
};

export const applyPanelAt = (
  grid: Grid,
  rowIdx: number,
  colIdx: number,
  panel: Panel
): [Grid, undefined?, { swapAction?: string; pos?: { row: number; col: number } }?] => {
  const strategy = getStrategy(panel.type);
  return strategy.applyEffect(grid, rowIdx, colIdx, panel);
};

export const placePanels = (
  original: Grid,
  placements: PanelPlacement[],
  mutate: boolean = false
): [Grid, boolean] => {
  const grid = mutate ? original : deepCopyGrid(original);

  for (const placement of placements) {
    if (!canPlaceSinglePanel(grid, placement)) return [grid, false];
  }

  let currentGrid = grid;
  for (const placement of placements) {
    const { panel, highlight, point } = placement;
    const topLeftX = point.x - highlight.x;
    const topLeftY = point.y - highlight.y;
    const [newGrid] = applyPanelAt(currentGrid, topLeftY, topLeftX, panel);
    currentGrid = newGrid;
  }

  return [currentGrid, true];
};
