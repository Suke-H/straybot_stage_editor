import { Cell, CellKey, CELL_TYPES } from "@/types/cell";
import { Panel } from "@/types/panel";
import { Grid } from "@/types/grid";

const CellKeys = Object.keys(CELL_TYPES) as CellKey[];

const decodeCell = (gridString: string): Cell[] => {
  const cells: Cell[] = [];
  let i = 0;
  while (i < gridString.length) {
    const twoChar = gridString.slice(i, i + 2);
    const twoCharType = CellKeys.find(k => CELL_TYPES[k].code === twoChar);
    if (twoCharType) {
      cells.push({ type: twoCharType });
      i += 2;
      continue;
    }
    const oneChar = gridString[i];
    const oneCharType = CellKeys.find(k => CELL_TYPES[k].code === oneChar);
    cells.push({ type: oneCharType ?? "Empty" });
    i += 1;
  }
  return cells;
};

const encodeStageToUrl = (grid: Grid, panels: Panel[]): string => {
  const cellsHeight = grid.length;
  const cellsWidth = grid[0].length;
  const cellsGrid = grid.flat().map(cell => CELL_TYPES[cell.type].code).join("");
  const cellsEncoded = `h${cellsHeight}w${cellsWidth}g${cellsGrid}`;

  const panelsEncoded = panels.map((panel) => {
    const height = panel.cells.length;
    const width = panel.cells[0].length;
    const gridData = panel.cells.flat().map(cell => CELL_TYPES[cell.type].code).join("");
    let prefix = "";
    if (panel.type === "Cut") prefix = "c-";
    else if (panel.type === "Swap") prefix = "s-";
    return `${prefix}h${height}w${width}g${gridData}`;
  }).join("_");

  return `cells=${cellsEncoded}&panels=${panelsEncoded}&mode=play`;
};

export const shareStageUrl = (grid: Grid, panels: Panel[]) => {
  const stageData = encodeStageToUrl(grid, panels);
  const url = `${window.location.origin}/stage?${stageData}`;
  navigator.clipboard.writeText(url);
  alert("URLをコピーしました！");
};

export const decodeStageFromUrl = (stageData: string) => {
  const params = new URLSearchParams(stageData);

  const cellsRaw = params.get("cells") || "";
  const cellsHeight = parseInt(cellsRaw.match(/h(\d+)/)?.[1] || "0", 10);
  const cellsWidth = parseInt(cellsRaw.match(/w(\d+)/)?.[1] || "0", 10);
  const cellsGridString = cellsRaw.match(/g(.+)/)?.[1] || "";

  const decodedCells = decodeCell(cellsGridString);
  const cells = Array.from({ length: cellsHeight }, (_, i) =>
    decodedCells.slice(i * cellsWidth, (i + 1) * cellsWidth)
  );

  const panelsRaw = params.get("panels") || "";
  const panels = panelsRaw.split("_").map((panelRaw, index) => {
    let panelStr = panelRaw;
    let type: Panel["type"] = "Normal";
    if (panelStr.startsWith("c-")) { type = "Cut"; panelStr = panelStr.slice(2); }
    else if (panelStr.startsWith("s-")) { type = "Swap"; panelStr = panelStr.slice(2); }

    const height = parseInt(panelStr.match(/h(\d+)/)?.[1] || "0", 10);
    const width = parseInt(panelStr.match(/w(\d+)/)?.[1] || "0", 10);
    const gridData = panelStr.match(/g(.+)/)?.[1] || "";

    const decodedPanelCells = decodeCell(gridData);
    const panelCells = Array.from({ length: height }, (_, i) =>
      decodedPanelCells.slice(i * width, (i + 1) * width)
    );

    return { id: `panel-${index}`, cells: panelCells, type };
  });

  return { cells, panels };
};
