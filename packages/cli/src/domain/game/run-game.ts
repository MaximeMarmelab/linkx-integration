import type { Grid } from "../state/grid.ts";

import { parseSaveFile } from "../state/gamestate-parser.ts";
import { gridReducer } from "../state/grid-reducer.ts";

export function runGame(stringifiedState?: string): Grid {
  const moves = parseSaveFile(stringifiedState);
  let grid = initGrid();
  moves.forEach((move) => {
    grid = gridReducer(grid, move);
  });

  return grid;
}

export function initGrid(): Grid {
  const grid = [];

  for (let i = 0; i < 9; i++) {
    const column = [];
    for (let j = 0; j < 9; j++) {
      column.push(".");
    }
    grid.push(column);
  }

  return grid;
}
