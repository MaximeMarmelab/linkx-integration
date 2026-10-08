import type { PieceCount } from "../game/game.ts";
import type { Move } from "../game/move.ts";

export function availablePiecesReducer(
  state: Array<PieceCount>,
  action: Move,
): Array<PieceCount> {
  return state.map((pieceCount) => {
    if (
      pieceCount.piece === action.piece &&
      action.color === pieceCount.color
    ) {
      if (pieceCount.count === 0) {
        throw new Error(
          `The piece ${action.piece} is all used up and not available.`,
        );
      }
      return {
        ...pieceCount,
        count: pieceCount.count - 1,
      };
    }
    return pieceCount;
  });
}
