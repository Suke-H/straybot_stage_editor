import { parse, stringify } from "yaml";
import { Cell, CellKey, CELL_TYPES } from "@/types/cell";
import { Panel } from "@/types/panel";
import { Grid } from "@/types/grid";
import { capitalize } from "./string-operations";

interface CellYamlData {
  Type: string;
}

interface PanelYamlData {
  Type: string;
  Coordinates?: { X: number; Y: number }[];
}

const removeExtraEmptyCells = (grid: Grid): Grid => {
  if (grid.length === 0 || grid[0].length === 0) return grid;

  let minRow = 0, maxRow = grid.length - 1;
  let minCol = 0, maxCol = grid[0].length - 1;

  while (minRow <= maxRow && grid[minRow].every(cell => cell.type === "Empty")) minRow++;
  while (maxRow >= minRow && grid[maxRow].every(cell => cell.type === "Empty")) maxRow--;
  while (minCol <= maxCol && grid.slice(minRow, maxRow + 1).every(row => row[minCol].type === "Empty")) minCol++;
  while (maxCol >= minCol && grid.slice(minRow, maxRow + 1).every(row => row[maxCol].type === "Empty")) maxCol--;

  if (minRow > maxRow || minCol > maxCol) return [[{ type: "Empty" }]];

  return grid.slice(minRow, maxRow + 1).map(row => row.slice(minCol, maxCol + 1));
};

export const exportStageToYaml = (grid: Grid, panels: Panel[]): string => {
  const trimmedGrid = removeExtraEmptyCells(grid);

  const cells = [...trimmedGrid].reverse().map((row) =>
    row.map((cell): CellYamlData => ({ Type: cell.type }))
  );

  const panelCoordinates = panels.map((panel) => {
    const baseData = { Type: panel.type || "Normal" };

    if (panel.type === "Swap") {
      return { ...baseData, Coordinates: [{ X: 0, Y: 0 }] };
    }

    return {
      ...baseData,
      Coordinates: panel.cells.flatMap((row, y) =>
        row
          .map((cell, x) => cell.type === "Black" ? { X: x, Y: panel.cells.length - 1 - y } : null)
          .filter((coord): coord is { X: number; Y: number } => coord !== null)
      ),
    };
  });

  return stringify({
    Height: trimmedGrid.length,
    Width: trimmedGrid[0].length,
    Cells: cells,
    Panels: panelCoordinates,
  });
};

export const importStageFromYaml = (yamlString: string): [Grid, Panel[]] => {
  const yamlData = parse(yamlString);
  const { Height, Width, Cells, Panels } = yamlData;

  const grid: Grid = [...Cells].reverse().map((row: CellYamlData[]) =>
    row.map((cell): Cell => ({ type: cell.Type as CellKey }))
  );

  const panels: Panel[] = Panels.map((panel: PanelYamlData, index: number) => {
    if (panel.Type === "Swap") {
      return { id: `panel-${index}`, cells: [[{ type: "Swap" } as Cell]], type: "Swap" as Panel["type"] };
    }

    const panelGrid: Cell[][] = Array.from({ length: Height }, () =>
      Array.from({ length: Width }, (): Cell => ({ type: "White" }))
    );

    panel.Coordinates?.forEach(({ X, Y }) => {
      panelGrid[Height - 1 - Y][X] = { type: "Black" };
    });

    return {
      id: `panel-${index}`,
      cells: panelGrid,
      type: (panel.Type as Panel["type"]) || "Normal",
    };
  });

  return [grid, trimPanels(panels)];
};

const trimPanels = (panels: Panel[]): Panel[] => panels.map(trimPanelCells);

const trimPanelCells = (panel: Panel): Panel => {
  if (panel.type === "Swap") return panel;

  const coordinates = panel.cells.flatMap((row, rowIndex) =>
    row
      .map((cell, colIndex) => cell.type === "Black" ? { X: colIndex, Y: rowIndex } : null)
      .filter((c): c is { X: number; Y: number } => c !== null)
  );

  if (coordinates.length === 0) {
    return { id: panel.id, cells: [], type: panel.type || "Normal" };
  }

  const minX = Math.min(...coordinates.map(c => c.X));
  const maxX = Math.max(...coordinates.map(c => c.X));
  const minY = Math.min(...coordinates.map(c => c.Y));
  const maxY = Math.max(...coordinates.map(c => c.Y));

  return {
    id: panel.id,
    cells: panel.cells.slice(minY, maxY + 1).map(row => row.slice(minX, maxX + 1)),
    type: panel.type || "Normal",
  };
};
