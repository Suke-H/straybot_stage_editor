import { CellKey } from "./schema";

export type CellDefinition = {
  label: string;
  color: string;
  code: string;
  picture: string;
};

export const CELL_TYPES: Record<CellKey, CellDefinition> = {
  Empty: { label: "空", color: "bg-white", code: "e", picture: "empty.png" },
  White: { label: "通常床（白）", color: "bg-[#DAE0EA]", code: "w", picture: "white.png" },
  Black: { label: "通常床（黒）", color: "bg-gray-700", code: "b", picture: "black.png" },
  Swap: { label: "入れ替え", color: "bg-yellow-400", code: "s", picture: "swap.png" },
  Start: { label: "スタート", color: "bg-green-500", code: "st", picture: "start.png" },
  Goal: { label: "ゴール", color: "bg-blue-500", code: "g", picture: "goal.png" },
  DummyGoal: { label: "ダミーゴール", color: "bg-red-500", code: "d", picture: "dummy-goal.png" },
  Crow: { label: "カラス", color: "bg-black", code: "c", picture: "crow.png" },
  Wolf: { label: "オオカミ", color: "bg-gray-500", code: "o", picture: "wolf.png" },
  Trauma: { label: "トラウマ", color: "bg-purple-500", code: "t", picture: "warp-white.png" },
  Rest: { label: "休憩", color: "bg-yellow-500", code: "r", picture: "rest.png" },
  FootUp: { label: "足あと↑", color: "bg-gray-200", code: "fu", picture: "foot_up.png" },
  FootRight: { label: "足あと→", color: "bg-gray-200", code: "fr", picture: "foot_right.png" },
  FootDown: { label: "足あと↓", color: "bg-gray-200", code: "fd", picture: "foot_down.png" },
  FootLeft: { label: "足あと←", color: "bg-gray-200", code: "fl", picture: "foot_left.png" },
  Flag: { label: "フラグ", color: "bg-gray-200", code: "f", picture: "flag.png" },
} as const;
