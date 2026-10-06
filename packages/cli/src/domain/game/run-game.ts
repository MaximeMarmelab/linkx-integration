import { readFile } from "node:fs/promises";

import type { Grid } from "../state/grid.ts";

import { displayGame } from "../../cli/display-game.ts";
import { parseSaveFile } from "../state/gamestate-parser.ts";
import { gridReducer } from "../state/grid-reducer.ts";

export function runGame(inputFilePath?: string) {
  if (inputFilePath) {
    readFile(inputFilePath, "utf8")
      .then((fileContent) => {
        displayGrid(fileContent);
      })
      .catch((err) => {
        console.error(`Cannot read file ${inputFilePath} : ${err}`);
      });
  } else {
    displayGrid("");
  }
}

function displayGrid(stringifiedState: string): void {
  const moves = parseSaveFile(stringifiedState);
  let grid = initGrid();
  moves.forEach((move) => {
    grid = gridReducer(grid, move);
  });

  displayGame(grid);
}

function initGrid(): Grid {
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
