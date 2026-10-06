import type { Move } from "./move.ts";

const correspondenceTable = [
  {
    piece: "1",
    possibleMatrices: [
      {
        rotations: [0, 1, 2, 3],
        mirrored: [true, false],
        matrix: [[1]],
      },
    ],
  },
  {
    piece: "2",
    possibleMatrices: [
      {
        rotations: [0, 2],
        mirrored: [true, false],
        matrix: [[1], [1]],
      },
      {
        rotations: [1, 3],
        mirrored: [true, false],
        matrix: [[1, 1]],
      },
    ],
  },
  {
    piece: "3I",
    possibleMatrices: [
      {
        rotations: [0, 2],
        mirrored: [true, false],
        matrix: [[1], [1], [1]],
      },
      {
        rotations: [1, 3],
        mirrored: [true, false],
        matrix: [[1, 1, 1]],
      },
    ],
  },
  {
    piece: "3L",
    possibleMatrices: [
      {
        rotations: [0],
        mirrored: [false, true],
        matrix: [
          [1, 1],
          [0, 1],
        ],
      },
      {
        rotations: [1],
        mirrored: [false, true],
        matrix: [
          [0, 1],
          [1, 1],
        ],
      },
      {
        rotations: [2],
        mirrored: [false, true],
        matrix: [
          [1, 0],
          [1, 1],
        ],
      },
      {
        rotations: [3],
        mirrored: [false, true],
        matrix: [
          [1, 1],
          [1, 0],
        ],
      },
    ],
  },
  {
    piece: "4S",
    possibleMatrices: [
      {
        rotations: [0, 2],
        mirrored: [false],
        matrix: [
          [1, 1, 0],
          [0, 1, 1],
        ],
      },
      {
        rotations: [1, 3],
        mirrored: [false],
        matrix: [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
      {
        rotations: [0, 2],
        mirrored: [true],
        matrix: [
          [0, 1, 1],
          [1, 1, 0],
        ],
      },
      {
        rotations: [1, 3],
        mirrored: [true],
        matrix: [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      },
    ],
  },
  {
    piece: "4T",
    possibleMatrices: [
      {
        rotations: [0],
        mirrored: [false, true],
        matrix: [
          [0, 1],
          [1, 1],
          [0, 1],
        ],
      },
      {
        rotations: [1],
        mirrored: [false, true],
        matrix: [
          [0, 1, 0],
          [1, 1, 1],
        ],
      },
      {
        rotations: [2],
        mirrored: [false, true],
        matrix: [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
      },
      {
        rotations: [3],
        mirrored: [false, true],
        matrix: [
          [1, 1, 1],
          [0, 1, 0],
        ],
      },
    ],
  },
  {
    piece: "4L",
    possibleMatrices: [
      {
        rotations: [0],
        mirrored: [false],
        matrix: [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
      },
      {
        rotations: [1],
        mirrored: [false],
        matrix: [
          [1, 1, 1],
          [1, 0, 0],
        ],
      },
      {
        rotations: [2],
        mirrored: [false],
        matrix: [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
      },
      {
        rotations: [3],
        mirrored: [false],
        matrix: [
          [0, 0, 1],
          [1, 1, 1],
        ],
      },
      {
        rotations: [0],
        mirrored: [true],
        matrix: [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
      },
      {
        rotations: [1],
        mirrored: [true],
        matrix: [
          [1, 1, 1],
          [0, 0, 1],
        ],
      },
      {
        rotations: [2],
        mirrored: [true],
        matrix: [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
      },
      {
        rotations: [3],
        mirrored: [true],
        matrix: [
          [1, 0, 0],
          [1, 1, 1],
        ],
      },
    ],
  },
];

export function moveToMatrix(move: Move): Array<Array<number>> {
  return correspondenceTable
    .filter((correspondenceEntry) => move.piece === correspondenceEntry.piece)
    .flatMap((correspondenceEntry) => correspondenceEntry.possibleMatrices)
    .filter(
      (possibleMatrix) =>
        possibleMatrix.mirrored.includes(move.mirrored ?? false) &&
        possibleMatrix.rotations.includes(move.rotation ?? 0),
    )
    .flatMap((matrix) => matrix.matrix);
}
