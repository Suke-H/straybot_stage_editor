import { Cell, CELL_TYPES } from "@/types/cell";

export const CellImage: React.FC<{ cell: Cell }> = ({ cell }) => {
  const def = CELL_TYPES[cell.type];
  return <img src={`/cells/${def.picture}`} alt={def.label} className="w-full h-full object-contain" />;
};
