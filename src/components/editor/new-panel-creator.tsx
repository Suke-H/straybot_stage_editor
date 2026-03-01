import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { panelListSlice } from "@/store/slices/panel-list-slice";
import { RootState } from "@/store";

export const NewPanelCreator: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCellType = useSelector(
    (state: RootState) => state.cellType.selectedCellType
  );

  const addPanel = () => {
    dispatch(
      panelListSlice.actions.createPanel({
        id: `panel-${Date.now()}`,
        cells: [[{ type: selectedCellType }]],
      })
    );
  };

  return (
    <Card className="w-64 bg-[#B3B9D1] md:self-start">
      <CardHeader>
        <CardTitle>パネル作成</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={addPanel}
          disabled={selectedCellType === "Empty"}
          className="w-10 h-10 p-0"
        >
          <Plus size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};
