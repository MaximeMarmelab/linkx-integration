import type { Color, Move } from "../game/move.ts";

/**
 * Transform a string describing the state of the game into an ordered array of moves.
 * The index 0 corresponds to the first move.
 * @param input The state string to be parsed. Format is described in notation.md. Can be undefined or null to obtain a blank state.
 * @returns An ordered array containing Move objects normalized.
 */
export function parseSaveFile(input?: string): Array<Move> {
  if (!input || input.length === 0) {
    return [];
  }

  const parts = input.split(" ");
  let color: Color = "blue";
  return parts
    .map((moveInput, index) => {
      if (index === 0 && /W/i.test(moveInput)) {
        color = "white";
      } else if (moveInput === "--") {
        color = reverseColor(color);
        return {
          skipped: true,
        } as Move;
      } else {
        const unreversedColor = color;
        color = reverseColor(color);

        return {
          skipped: false,
          color: unreversedColor,
          piece: extractPiece(moveInput),
          column: extractColumn(moveInput),
          rotation: extractRotation(moveInput),
          mirrored: /m/i.test(moveInput),
        } as Move;
      }
    })
    .filter((m) => !!m); // Necessary to exclude the undefined value from the white start flag if present
}

function reverseColor(color: Color): Color {
  if (color === "white") {
    return "blue";
  }
  return "white";
}

function extractPiece(moveInput: string): string {
  if (moveInput[0] === "1" || moveInput[0] === "2") {
    return moveInput[0];
  } else if (moveInput[0] === "3" || moveInput[0] === "4") {
    if (moveInput.length <= 1) {
      throw new Error(
        `The move "${moveInput}" is too short and does not contains the required information.`,
      );
    }
    return moveInput[0] + moveInput[1];
  }
  throw new Error(`Piece ${moveInput[0]} not recognized.`);
}

function extractRotation(moveInput: string): number {
  const rotationInput = moveInput.match(/r\d/);
  if (rotationInput && rotationInput[0]) {
    return Number.parseInt(rotationInput[0].charAt(1));
  }
  return 0;
}

function extractColumn(moveInput: string): number {
  const columnChar = moveInput[moveInput.length - 1];
  if (columnChar && /\d/.test(columnChar)) {
    return Number.parseInt(columnChar);
  }
  throw new Error(
    "The last char of a move must be a number corresponding to the column in which the piece is played.",
  );
}
