import { CellKey } from "./schema";

export type CellDefinition = {
  label: string;
  color: string;
  code: string;
  picture: string;
};

export const CELL_TYPES: Record<CellKey, CellDefinition> = {
  Empty: { label: "空", color: "bg-white", code: "e", picture: "empty.png" },
  Normal: { label: "通常床", color: "bg-[#DAE0EA]", code: "n", picture: "white.png" },
  Start: { label: "スタート", color: "bg-green-500", code: "st", picture: "start.png" },
  Goal: { label: "ゴール", color: "bg-red-500", code: "g", picture: "goal.png" },
  ArrowUp: { label: "矢印↑", color: "bg-yellow-400", code: "au", picture: "arrow-up.png" },
  ArrowRight: { label: "矢印→", color: "bg-yellow-400", code: "ar", picture: "arrow-right.png" },
  ArrowDown: { label: "矢印↓", color: "bg-yellow-400", code: "ad", picture: "arrow-down.png" },
  ArrowLeft: { label: "矢印←", color: "bg-yellow-400", code: "al", picture: "arrow-left.png" },
  Reverse: { label: "リバース", color: "bg-orange-400", code: "rv", picture: "reverse.png" },
  Tele: { label: "テレポート", color: "bg-cyan-400", code: "tl", picture: "tele.png" },
  Flag: { label: "フラグ", color: "bg-emerald-500", code: "f", picture: "flag.png" },
  FootUp: { label: "足あと↑", color: "bg-gray-200", code: "fu", picture: "foot_up.png" },
  FootRight: { label: "足あと→", color: "bg-gray-200", code: "fr", picture: "foot_right.png" },
  FootDown: { label: "足あと↓", color: "bg-gray-200", code: "fd", picture: "foot_down.png" },
  FootLeft: { label: "足あと←", color: "bg-gray-200", code: "fl", picture: "foot_left.png" },
} as const;
