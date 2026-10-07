import type { Grid } from "../state/grid.ts";
import type { Game, PieceCount } from "./game.ts";
import type { Color, Move, Piece } from "./move.ts";

import { availablePiecesReducer } from "../state/available-pieces-reducer.ts";
import { parseSaveFile } from "../state/gamestate-parser.ts";
import { gridReducer } from "../state/grid-reducer.ts";

export function runGame(stringifiedState?: string): Game {
  const moves = parseSaveFile(stringifiedState);
  let game: Game = {
    grid: initGrid(),
    availablePieces: initAvailablePieces(),
    turnOfPlayer:
      stringifiedState && /^W/i.test(stringifiedState) ? "white" : "blue",
  };

  moves.forEach((move) => (game = gameReducer(game, move)));

  return game;
}

export function gameReducer(game: Game, move: Move): Game {
  if (move.color !== game.turnOfPlayer) {
    throw new Error("This is not your turn to play.");
  }
  return {
    grid: gridReducer(game.grid, move),
    availablePieces: availablePiecesReducer(game.availablePieces, move),
    turnOfPlayer: reverseColor(move.color),
  };
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

export function initAvailablePieces(): Array<PieceCount> {
  return (["1", "2", "3I", "3L", "4S", "4T", "4L"] as Array<Piece>).flatMap(
    (piece: Piece) => {
      return [
        { count: 2, piece, color: "blue" },
        { count: 2, piece, color: "white" },
      ];
    },
  );
}

function reverseColor(color: Color) {
  return color === "blue" ? "white" : "blue";
}
