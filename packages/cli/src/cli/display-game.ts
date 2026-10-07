import chalk from "chalk";

import type { Grid } from "../domain/state/grid.ts";

const MAX_HEIGHT = 8;

export function displayGame(grid: Grid) {
  const rows: Array<string> = [];

  grid.forEach((column) => {
    column.forEach((cell, y) => {
      const relevantRow = MAX_HEIGHT - y;
      if (!rows[relevantRow]) {
        rows[relevantRow] = "";
      }
      rows[relevantRow] += cellToChalkDisplay(cell);
    });
  });

  rows.forEach((row) => console.log(row));
}

function cellToChalkDisplay(cell: string): string {
  switch (cell) {
    case "W":
      return chalk.white("■");
    case "B":
      return chalk.blue("■");
    case ".":
    default:
      return chalk.grey(".");
  }
}
