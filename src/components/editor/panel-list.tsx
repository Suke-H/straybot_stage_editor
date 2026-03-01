import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CellImage } from "@/components/ui/cell-image";
import { Trash2, Move, Scissors } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { Panel } from "@/types/panel";
import { Cell } from "@/types/cell";
import { StudioMode, StudioModeInEditor } from "@/types/store";
import { panelListSlice } from "@/store/slices/panel-list-slice";
import { panelPlacementSlice } from "@/store/slices/panel-placement-slice";
import { studioModeInEditorSlice } from "@/store/slices/studio-mode-in-editor-slice";

import { PlacementControllPart } from "./panel-list/placement-controll-part";

export const PanelList: React.FC = () => {
  const dispatch = useDispatch();
  const studioMode = useSelector((s: RootState) => s.studioMode.studioMode);
  const panels     = useSelector((s: RootState) => s.panelList.panels);
  const placement  = useSelector((s: RootState) => s.panelPlacement.panelPlacementMode);

  const selectPanel = (panel: Panel) => {
    if (placement.panel?.id === panel.id) {
      dispatch(panelPlacementSlice.actions.clearPanelSelection());
      return;
    }

    let hl = { row: 0, col: 0 };
    outer: for (let i = 0; i < panel.cells.length; i++)
      for (let j = 0; j < panel.cells[i].length; j++)
        if ((panel.cells[i][j] as Cell).type === "Black") {
          hl = { row: i, col: j };
          break outer;
        }

    dispatch(panelPlacementSlice.actions.selectPanelForPlacement({ panel, highlightedCell: hl }));

    if (studioMode === StudioMode.Editor)
      dispatch(studioModeInEditorSlice.actions.switchMode(StudioModeInEditor.Play));
  };

  return (
    <Card className="flex-1 bg-[#B3B9D1] min-w-[300px] max-w-[600px]">
      <CardHeader>
        <CardTitle>パネル</CardTitle>
      </CardHeader>
      <CardContent>
        <PlacementControllPart />

        <div className="flex flex-wrap gap-2 max-w-full">
          {panels.map((panel) => {
            const selected = placement.panel?.id === panel.id;
            return (
              <div key={panel.id} className="flex flex-col items-center">
                <div className="mb-1">
                  {panel.type === "Cut" && <Scissors size={20} />}
                </div>
                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: `repeat(${panel.cells[0]?.length || 1}, 40px)` }}
                  onClick={() => selectPanel(panel)}
                >
                  {panel.cells.map((row, ri) =>
                    row.map((cell, ci) => {
                      const highlight =
                        selected &&
                        placement.highlightedCell?.row === ri &&
                        placement.highlightedCell?.col === ci;
                      return (
                        <div
                          key={`${ri}-${ci}`}
                          className={`h-10 w-10 ${highlight ? "ring-2 ring-red-500" : ""}`}
                        >
                          <CellImage cell={cell as Cell} />
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => selectPanel(panel)}>
                    <Move size={16} />
                  </Button>
                  {studioMode === StudioMode.Editor && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dispatch(panelListSlice.actions.removePanel(panel.id))}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
