import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { gridSlice } from "@/store/slices/grid-slice";
import { panelListSlice } from "@/store/slices/panel-list-slice";
import { panelPlacementSlice } from "@/store/slices/panel-placement-slice";
import { setSwapTarget, clearSwapTarget } from "@/store/slices/swap-slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CellImage } from "@/components/ui/cell-image";

import { Cell, CellKey } from "@/types/cell";
import { Grid } from "@/types/grid";
import { Panel } from "@/types/panel";
import { canPlacePanelAt, applyPanelAt } from "@/logic/panels";
import { StudioMode } from "@/types/store";

import { MatrixOperationPart } from "./grid/matrix-operation-part";
import { StageDataIOPart } from "./grid/stage-data-io-part";

export const GridViewer: React.FC = () => {
  const dispatch = useDispatch();

  const studioMode      = useSelector((s: RootState) => s.studioMode.studioMode);
  const grid            = useSelector((s: RootState) => s.grid.grid) as Grid;
  const gridHistory     = useSelector((s: RootState) => s.grid.gridHistory);
  const selectedCellKey = useSelector((s: RootState) => s.cellType.selectedCellType) as CellKey;
  const placementMode   = useSelector((s: RootState) => s.panelPlacement.panelPlacementMode);
  const swapState       = useSelector((s: RootState) => s.swap);

  const handleGridCellClick = (rowIdx: number, colIdx: number): void => {
    const placing = placementMode.panel as Panel | null;

    if (studioMode === StudioMode.Editor && !placing) {
      dispatch(gridSlice.actions.placeCell({ row: rowIdx, col: colIdx, cell: { type: selectedCellKey } }));
      dispatch(gridSlice.actions.initHistory());
      dispatch(gridSlice.actions.initPhaseHistory());
      return;
    }

    if (!placing) return;

    const panelType = placing.type ?? "Normal";

    let panelToApply = placing;
    if (panelType === "Swap" && swapState.swapTarget) {
      panelToApply = { ...placing, type: "SwapSecond" };
    }

    if (!canPlacePanelAt(grid, rowIdx, colIdx, panelToApply)) {
      dispatch(panelPlacementSlice.actions.selectPanelForPlacement({ panel: null, highlightedCell: null }));
      return;
    }

    if (gridHistory.length === 0) {
      dispatch(gridSlice.actions.initHistory());
      dispatch(gridSlice.actions.initPhaseHistory());
    } else {
      dispatch(gridSlice.actions.saveHistory());
    }

    const [newGrid, , swapInfo] = applyPanelAt(grid, rowIdx, colIdx, panelToApply);
    dispatch(gridSlice.actions.replaceGrid(newGrid));

    if (panelType === "Swap" && swapState.swapTarget) {
      dispatch(panelListSlice.actions.placePanel(placing));
    } else if (panelType !== "Swap") {
      dispatch(panelListSlice.actions.placePanel(placing));
    }

    if (swapInfo?.swapAction === "set") {
      dispatch(setSwapTarget(swapInfo.pos!));
    } else if (swapInfo?.swapAction === "clear") {
      dispatch(clearSwapTarget());
    }

    if (!(panelType === "Swap" && !swapState.swapTarget)) {
      dispatch(panelPlacementSlice.actions.selectPanelForPlacement({ panel: null, highlightedCell: null }));
    }
  };

  const renderCell = (cell: Cell, r: number, c: number) => {
    const isSwapTarget = swapState.swapTarget?.row === r && swapState.swapTarget?.col === c;

    return (
      <div
        key={`${r}-${c}`}
        className={`relative h-10 w-10 flex items-center justify-center ${
          cell.type === "Empty" ? "" : "border"
        } ${isSwapTarget ? "ring-2 ring-red-500" : ""}`}
        onClick={() => handleGridCellClick(r, c)}
      >
        {cell.type !== "Empty" && <CellImage cell={cell} />}
      </div>
    );
  };

  return (
    <Card className="w-fit bg-[#B3B9D1]">
      <CardHeader>
        <CardTitle>ステージグリッド</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-start">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${grid[0]?.length ?? 0}, 40px)`,
              gridTemplateRows: `repeat(${grid.length}, 40px)`,
              gap: "4px",
            }}
          >
            {grid.map((row, ri) => row.map((cell, ci) => renderCell(cell, ri, ci)))}
          </div>

          <div className="hidden lg:block w-20"></div>

          {studioMode === StudioMode.Editor && (
            <div className="flex flex-col gap-4 min-w-[200px] mt-8">
              <MatrixOperationPart />
              <StageDataIOPart />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
