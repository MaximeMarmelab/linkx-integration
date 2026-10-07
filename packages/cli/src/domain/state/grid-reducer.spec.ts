import type { Move } from "../game/move";

import { initGrid } from "../game/run-game";
import { gridReducer } from "./grid-reducer";

describe("grid-reducer", () => {
  const emptyGrid = initGrid();

  it("should place pieces on bottom of the grid", () => {
    const move = {
      skipped: false,
      color: "blue",
      piece: "4L",
      column: 6,
      rotation: 2,
      mirrored: false,
    } as Move;
    const grid = gridReducer(emptyGrid, move);

    expect(grid[6]?.at(0)).toBe("B");
    expect(grid[7]?.at(0)).toBe("B");
    expect(grid[8]?.at(0)).toBe("B");
    expect(grid[8]?.at(1)).toBe("B");
    // ........B
    // ......BBB
  });

  it("should place pieces on top of other pieces", () => {
    const firstMove = {
      skipped: false,
      color: "blue",
      piece: "4L",
      column: 6,
      rotation: 2,
      mirrored: true,
    } as Move;
    const secondMove = {
      skipped: false,
      color: "white",
      piece: "1",
      column: 7,
      rotation: 0,
      mirrored: false,
    } as Move;
    const firstStep = gridReducer(emptyGrid, firstMove);
    const grid = gridReducer(firstStep, secondMove);

    expect(grid).toBeTruthy();
    expect(grid[6]?.at(1)).toBe("B");
    expect(grid[7]?.at(0)).toBe("B");
    expect(grid[7]?.at(1)).toBe("W");
    expect(grid[8]?.at(0)).toBe("B");
    expect(grid[8]?.at(1)).toBe(".");
    // ......BW.
    // ......BBB
  });

  it("should rotate and mirror pieces", () => {
    const move = {
      skipped: false,
      color: "blue",
      piece: "4L",
      column: 7,
      rotation: 3,
      mirrored: true,
    } as Move;
    const grid = gridReducer(emptyGrid, move);

    expect(grid).toBeTruthy();
    expect(grid[7]?.at(0)).toBe("B");
    expect(grid[8]?.at(0)).toBe("B");
    expect(grid[8]?.at(1)).toBe("B");
    expect(grid[8]?.at(2)).toBe("B");
  });

  it("should place pieces on top of complex relief", () => {
    const firstMove = {
      skipped: false,
      color: "white",
      piece: "4T",
      column: 2,
      rotation: 2,
      mirrored: false,
    } as Move;
    const secondMove = {
      skipped: false,
      color: "blue",
      piece: "3L",
      column: 4,
      rotation: 1,
      mirrored: false,
    } as Move;

    const firstStep = gridReducer(emptyGrid, firstMove);
    const grid = gridReducer(firstStep, secondMove);

    expect(grid).toBeTruthy();
    expect(grid[2]?.at(0)).toBe("W");
    expect(grid[3]?.at(0)).toBe("W");
    expect(grid[3]?.at(1)).toBe("W");
    expect(grid[4]?.at(0)).toBe("W");
    expect(grid[4]?.at(1)).toBe("B");
    expect(grid[5]?.at(0)).toBe("B");
    expect(grid[5]?.at(1)).toBe("B");
  });
});
