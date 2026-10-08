import type { Move } from "../game/move";

import { initAvailablePieces } from "../game/run-game";
import { availablePiecesReducer } from "./available-pieces-reducer";

describe("available-pieces-reducer", () => {
  const allPieces = initAvailablePieces();
  const move: Move = {
    skipped: false,
    color: "blue",
    piece: "4L",
    column: 6,
    rotation: 2,
    mirrored: false,
  };

  it("should substract when using a piece", () => {
    const remainingPieces = availablePiecesReducer(allPieces, move);

    const unusedPieceCount = remainingPieces.find(
      (p) => p.piece === "3I" && p.color === "blue",
    );
    const usedPieceCount = remainingPieces.find(
      (p) => p.piece === "4L" && p.color === "blue",
    );
    expect(unusedPieceCount?.count).toBe(2);
    expect(usedPieceCount?.count).toBe(1);
  });

  it("should throw when using a piece not available.", () => {
    expect(() => {
      let remainingPieces = availablePiecesReducer(allPieces, move);
      remainingPieces = availablePiecesReducer(remainingPieces, move);
      remainingPieces = availablePiecesReducer(remainingPieces, move);
    }).toThrow("not available");
  });
});
