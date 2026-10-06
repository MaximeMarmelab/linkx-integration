import type { Move } from "../game/move.ts";
import type { Grid } from "./grid.ts";

import { moveToMatrix } from "../game/move-to-matrix.ts";

export function gridReducer(state: Grid, action: Move): Grid {
  if (action.skipped) {
    return state;
  }

  const newState: Grid = [];
  state.forEach((col) => newState.push([...col]));

  const moveMatrix = moveToMatrix(action);
  const moveLeftMostColumn = action.column ?? 0;
  const minimumHeight = calculateMinimumHeightOfPiece(
    state,
    moveLeftMostColumn,
    moveMatrix,
  );

  moveMatrix.forEach((column, xIndex) => {
    column.forEach((cell, yIndex) => {
      if (cell === 1) {
        const gridX = moveLeftMostColumn + xIndex;
        const gridY = minimumHeight + yIndex;

        if (newState[gridX]) {
          newState[gridX][gridY] = action.color === "blue" ? "B" : "W";
        }
      }
    });
  });

  return newState;
}

// Calculate the height of the placement of a piece
// based on the existing pieces in the designated columns.
function calculateMinimumHeightOfPiece(
  state: Grid,
  moveLeftMostColumn: number,
  moveMatrix: Array<Array<number>>,
) {
  let minimumHeight = 0;
  const moveRightMostColumn = moveLeftMostColumn + moveMatrix.length - 1;

  for (
    let columnIndex = moveLeftMostColumn;
    columnIndex <= moveRightMostColumn;
    columnIndex++
  ) {
    const topMostCell =
      state[columnIndex]?.findIndex((cell) => cell === ".") ?? 8;
    const pieceBottomCellForColumn =
      moveMatrix[columnIndex - moveLeftMostColumn]?.findIndex(
        (cell) => cell === 1,
      ) ?? 0;
    const heightOfThisCell = topMostCell - pieceBottomCellForColumn;

    minimumHeight = Math.max(heightOfThisCell, minimumHeight);
  }

  return minimumHeight;
}
