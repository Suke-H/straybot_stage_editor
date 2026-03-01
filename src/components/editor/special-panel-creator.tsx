import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Panel } from "@/types/panel";
import { Button } from "@/components/ui/button";
import { panelListSlice } from "@/store/slices/panel-list-slice";
import { useDispatch } from "react-redux";

export const SpecialPanelCreator: React.FC = () => {
  const dispatch = useDispatch();

  const addSwap = () => {
    const newPanel: Panel = {
      id: `panel-${Date.now()}`,
      cells: [[{ type: "Swap" }]],
      type: "Swap",
    };
    dispatch(panelListSlice.actions.createPanel(newPanel));
  };

  return (
    <Card className="w-64 bg-[#B3B9D1] md:self-start">
      <CardHeader>
        <CardTitle>特殊パネル作成</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <Button onClick={addSwap} className="w-full flex items-center justify-center gap-2">
            ⇔入れ替え
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
