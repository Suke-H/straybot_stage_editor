import { Button } from "@/components/ui/button";
import { panelPlacementSlice } from "@/store/slices/panel-placement-slice";
import { panelListSlice } from "@/store/slices/panel-list-slice";
import { gridSlice } from "@/store/slices/grid-slice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


// import { useToast } from "@/hooks/use-toast"
// import { toast } from "sonner";

export const PlacementControllPart: React.FC = () => {
  const dispatch = useDispatch();
  const gridHistory = useSelector((state: RootState) => state.grid.gridHistory);
  const phaseHistory = useSelector((state: RootState) => state.grid.phaseHistory);
  // const grid = useSelector((state: RootState) => state.grid.grid);
  
  // クリア状態を管理するローカルstate
  const [isCleared, setIsCleared] = useState<boolean>(false);

  // const { toast } = useToast();
  
  // 「1つ戻す」メソッド
  const undoLastPlacement = () => {
    // 通常パネルの場合
    dispatch(panelListSlice.actions.undo());
    dispatch(gridSlice.actions.undo());

    setIsCleared(false);
  };

  // 「リセット」メソッド
  const resetPanelPlacement = () => {
    // グリッドとパネル配置履歴をリセット
    dispatch(panelListSlice.actions.reset());
    dispatch(gridSlice.actions.reset());

    // パネル配置モードの終了
    dispatch(
      panelPlacementSlice.actions.selectPanelForPlacement({
        panel: null,
        highlightedCell: null,
      })
    );
    setIsCleared(false);
  };

  return (
    <div className="flex gap-2 mb-10">
      <Button
        onClick={undoLastPlacement}
        disabled={gridHistory.length < 2}
        className="flex items-center gap-2 w-20 text-left"              

      >
        1つ戻す
      </Button>
      <Button
        onClick={resetPanelPlacement}
        disabled={gridHistory.length < 2}
        variant="secondary"
        className="flex items-center gap-2 w-20 text-left"      
      >
        リセット
      </Button>
      <Button
        // onClick={playSimulation}
        // disabled={isCleared}
        // variant="destructive"
        // className="flex items-center gap-2 w-20 text-left"      
      >
        再生
      </Button>
    </div>
  );
};
