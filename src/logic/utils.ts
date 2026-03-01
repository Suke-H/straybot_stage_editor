import { Cell, CellKey } from '@/types/cell';
import { Grid } from '@/types/grid';
import { Vector } from '@/types/path';

export type Point = Vector;

export const inBounds = (point: Point, grid: Grid): boolean => {
  return point.y >= 0 && point.y < grid.length &&
         point.x >= 0 && point.x < grid[0].length;
}

export const isPassable = (cell: Cell): boolean => {
  return cell.type !== 'Empty';
}

export const findSingle = (grid: Grid, key: CellKey): Point | null => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].type === key) return { x, y };
    }
  }
  return null;
}

export const findAll = (grid: Grid, key: CellKey): Point[] => {
  const results: Point[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].type === key) results.push({ x, y });
    }
  }
  return results;
}

export const deepCopyGrid = (grid: Grid): Grid => {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

export const getNeighbors = (point: Point): Point[] => {
  return [
    { x: point.x, y: point.y - 1 },
    { x: point.x, y: point.y + 1 },
    { x: point.x - 1, y: point.y },
    { x: point.x + 1, y: point.y },
  ];
}

export const pointEquals = (a: Point, b: Point): boolean => {
  return a.x === b.x && a.y === b.y;
}

export const pointInArray = (point: Point, array: Point[]): boolean => {
  return array.some(p => pointEquals(p, point));
}
