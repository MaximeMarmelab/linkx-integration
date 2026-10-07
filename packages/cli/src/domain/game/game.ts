import type { Grid } from "../state/grid.ts";
import type { Color, Piece } from "./move.ts";

export type Game = {
  grid: Grid;
  availablePieces: Array<PieceCount>;
  turnOfPlayer: Color;
};

export type PieceCount = {
  piece: Piece;
  color: Color;
  count: number;
};
