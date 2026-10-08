import type { Move } from "../game/move.ts";
import type { Grid } from "./grid.ts";

import { GRID_MAX_HEIGHT } from "../game/game.ts";
import { getPieceShapeFromMove } from "../game/piece-shape-from-move.ts";

export function gridReducer(state: Grid, action: Move): Grid {
  if (action.skipped) {
    return state;
  }

  const newState = copyGridAndRemoveLastMove(state);

  const pieceShape = getPieceShapeFromMove(action);
  const moveLeftMostColumn = action.column ?? 0;
  const minimumHeight = calculateMinimumHeightOfPiece(
    newState,
    moveLeftMostColumn,
    pieceShape,
  );

  pieceShape.forEach((column, xIndex) => {
    const gridX = moveLeftMostColumn + xIndex;

    column.forEach((cell, yIndex) => {
      if (cell === 1) {
        const gridY = minimumHeight + yIndex;
        if (gridX > 8) {
          throw new Error(
            "The given piece would be out of bonds through the right of the grid.",
          );
        }
        if (gridY > 8) {
          throw new Error(
            "The given piece would be out of bonds through the top of the grid.",
          );
        }

        if (newState[gridX]) {
          newState[gridX][gridY] = action.color === "blue" ? "B" : "W"; // The last move is in uppercase letters
        }
      }
    });

    validateNoFloatingBlockInColumn(
      newState[gridX],
      column,
      minimumHeight,
      gridX,
    );
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
    // Not finding the topMostCell means we are going out of bonds
    const topMostCellIndex =
      state[columnIndex]?.findIndex((cell) => cell === ".") ??
      GRID_MAX_HEIGHT + 1;
    const topMostCell =
      topMostCellIndex >= 0 ? topMostCellIndex : GRID_MAX_HEIGHT + 1;

    const pieceBottomCellForColumn =
      moveMatrix[columnIndex - moveLeftMostColumn]?.findIndex(
        (cell) => cell === 1,
      ) ?? 0;
    const heightOfThisCell = topMostCell - pieceBottomCellForColumn;

    minimumHeight = Math.max(heightOfThisCell, minimumHeight);
  }

  return minimumHeight;
}

function copyGridAndRemoveLastMove(state: Grid): Grid {
  return state.map((col) => {
    return col.map((cell) => {
      return cell.toLowerCase();
    });
  });
}

function hasBlockFloatingWithinPieceCol(
  blocksWithinPiece: string[],
  columnIndex: number,
) {
  let hasSupport = true;
  for (let cell of blocksWithinPiece) {
    const isBlock = /[wb]/i.test(cell);
    if (!hasSupport && isBlock) {
      throw new Error(
        `The proposed piece would be floating in column ${columnIndex}`,
      );
    }
    hasSupport = isBlock;
  }
}

function validateNoFloatingBlockInColumn(
  gridColumn: Array<string> | undefined,
  pieceColumn: Array<number>,
  minimumHeight: number,
  columnIndex: number,
) {
  const blocksBelowPiece = gridColumn?.slice(0, minimumHeight) ?? [];
  const blocksWithinPiece =
    gridColumn?.slice(minimumHeight, minimumHeight + pieceColumn.length) ?? [];
  const blockFloatingWithinPiece = hasBlockFloatingWithinPieceCol(
    blocksWithinPiece,
    columnIndex + 1,
  );
  if (
    blocksBelowPiece.find((cell) => cell === ".") ||
    blockFloatingWithinPiece
  ) {
    throw new Error(
      `The proposed piece would be floating in column ${columnIndex + 1}.`,
    );
  }
}
