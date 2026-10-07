import chalk from "chalk";

import type { Game, PieceCount } from "../domain/game/game.ts";
import type { Color } from "../domain/game/move.ts";
import type { Grid } from "../domain/state/grid.ts";

import { getPieceShapeFromMove } from "../domain/game/piece-shape-from-move.ts";

const GRID_MAX_HEIGHT = 8;
const PIECE_MAX_HEIGHT = 3;

export function displayGame(game: Game) {
  let rows = getGridAsStrings(game.grid);
  rows = addRemainingPiecesToRows(rows, game.availablePieces);

  rows.forEach((row) => console.log(row));
}

export function getGridAsStrings(grid: Grid): Array<string> {
  const rows: Array<string> = [];

  grid.forEach((column: Array<string>) => {
    column.forEach((cell, y) => {
      const relevantRow = GRID_MAX_HEIGHT - y;
      if (!rows[relevantRow]) {
        rows[relevantRow] = "";
      }
      rows[relevantRow] += stringCellToChalkDisplay(cell);
    });
  });

  return rows;
}

function stringCellToChalkDisplay(cell: string): string {
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

function intCellToChalkDisplay(cell: number, color: Color): string {
  if (color === "blue" && cell === 1) {
    return chalk.blue("■");
  } else if (color === "white" && cell === 1) {
    return chalk.white("■");
  }
  return chalk.grey(".");
}

function addRemainingPiecesToRows(
  rows: Array<string>,
  availablePieces: Array<PieceCount>,
): Array<string> {
  const updatedRows = [...rows, "         ", "         ", "         "];

  const remainingBluePieces = availablePieces.filter((p) => p.color === "blue");
  const remainingWhitePieces = availablePieces.filter(
    (p) => p.color === "white",
  );
  const blueTotal = remainingBluePieces
    .map((p) => p.count)
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const whiteTotal = remainingWhitePieces
    .map((p) => p.count)
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

  const bluePiecesStrings = generateAvailablePiecesStrings(
    "blue",
    remainingBluePieces,
  );
  const whitePiecesStrings = generateAvailablePiecesStrings(
    "white",
    remainingWhitePieces,
  );

  updatedRows[0] += `   ${chalk.blue("BLUE")} stock:  ${blueTotal} pieces`;
  updatedRows[1] += `   1    2    3    4    5    6   7`;
  bluePiecesStrings.forEach((str, index) => {
    updatedRows[2 + index] += str;
  });

  updatedRows[6] += `   ${chalk.white("WHITE")} stock:  ${whiteTotal} pieces`;
  updatedRows[7] += `   1    2    3    4    5    6   7`;
  whitePiecesStrings.forEach((str, index) => {
    updatedRows[8 + index] += str;
  });

  return updatedRows;
}

function generateAvailablePiecesStrings(
  color: Color,
  availablePieces: Array<PieceCount>,
): Array<string> {
  const generatedStrings = ["  ", "  ", "  ", "  "];
  availablePieces.forEach((pieceCount) => {
    const pieceShape = getPieceShapeFromMove({
      color,
      skipped: false,
      piece: pieceCount.piece,
      rotation: 0,
    });

    // Cannot use foreach because some pieces are smaller than the display
    for (let x = 0; x < PIECE_MAX_HEIGHT; x++) {
      for (let y = 0; y < PIECE_MAX_HEIGHT; y++) {
        const cellValue = pieceShape[x]?.at(y) ?? 0;
        generatedStrings[y] += intCellToChalkDisplay(cellValue, color);
      }
    }

    if (pieceCount.count === 2) {
      generatedStrings[3] +=
        color === "blue" ? chalk.blue("◉◉ ") : chalk.white("◉◉ ");
    } else if (pieceCount.count === 1) {
      generatedStrings[3] +=
        color === "blue" ? chalk.blue("◉○ ") : chalk.white("◉○ ");
    } else {
      generatedStrings[3] +=
        color === "blue" ? chalk.blue("○○ ") : chalk.white("○○ ");
    }

    generatedStrings.forEach((str, index) => (generatedStrings[index] += "  "));
  });

  return generatedStrings;
}
