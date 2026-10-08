import type { PieceCount } from "./game.ts";
import type { Move, Rotation } from "./move.ts";

import { GRID_MAX_HEIGHT, type Game } from "./game.ts";
import { getPossibleShapesForPiece } from "./piece-shape-from-move.ts";
import { gameReducer } from "./run-game.ts";

export function getPossibleMoves(game: Game): Move[] {
  const possibleColumns = Array.from(
    { length: GRID_MAX_HEIGHT },
    (_v, k) => k + 1,
  ).filter(
    // Exclude full columns
    (columnIndex) => game.grid[columnIndex]?.at(GRID_MAX_HEIGHT - 1) === ".",
  );

  return game.availablePieces
    .filter((pieces) => game.turnOfPlayer === pieces.color)
    .filter((pieces) => pieces.count > 0)
    .flatMap((pieces) =>
      crossPossibleColumnsAndPossiblePieces(pieces, possibleColumns, game),
    )
    .map((move: Move) => {
      try {
        gameReducer(game, move); // Will throw if the move is illegal
        return move;
      } catch {
        return undefined;
      }
    })
    .filter((move) => !!move);
}

function crossPossibleColumnsAndPossiblePieces(
  pieces: PieceCount,
  possibleColumns: number[],
  game: Game,
) {
  return getPossibleShapesForPiece(pieces.piece).flatMap((possibleShape) => {
    return possibleColumns.map((columnIndex) => {
      return {
        skipped: false,
        color: game.turnOfPlayer,
        piece: pieces.piece,
        column: columnIndex,
        rotation: possibleShape.rotations[0] as Rotation,
        mirrored: possibleShape.mirrored[0],
      } satisfies Move;
    });
  });
}
