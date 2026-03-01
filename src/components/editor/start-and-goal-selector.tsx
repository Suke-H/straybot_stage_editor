import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startAndGoalSlice } from "@/store/slices/start-and-goal-slice";
import { RootState } from "@/store";

const ITEMS = [
  { target: "start" as const, label: "スタート", picture: "start.png" },
  { target: "goal"  as const, label: "ゴール",   picture: "goal.png"  },
];

export const StartAndGoalSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { startAndGoal, selectingTarget } = useSelector(
    (state: RootState) => state.startAndGoal
  );

  const handleClick = (target: "start" | "goal") => {
    dispatch(
      startAndGoalSlice.actions.setSelectingTarget(
        selectingTarget === target ? null : target
      )
    );
  };

  const formatPos = (pos: { y: number; x: number } | null) =>
    pos ? `(${pos.y}, ${pos.x})` : "未設定";

  return (
    <Card className="bg-[#B3B9D1] min-w-[300px] max-w-[600px]">
      <CardHeader>
        <CardTitle>スタート・ゴール</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          {ITEMS.map(({ target, label, picture }) => (
            <div key={target} className="flex flex-col items-center gap-1">
              <div
                className={`h-10 w-10 cursor-pointer ${
                  selectingTarget === target ? "ring-2 ring-red-500" : ""
                }`}
                onClick={() => handleClick(target)}
              >
                <img src={`/cells/${picture}`} alt={label} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs">{label}</span>
              <span className="text-xs">{formatPos(startAndGoal[target])}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
