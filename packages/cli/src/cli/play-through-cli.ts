import type readline from "node:readline";

import chalk from "chalk";

import type { Game } from "../domain/game/game.ts";
import type { Move, Piece } from "../domain/game/move.ts";

import { gameReducer } from "../domain/game/run-game.ts";
import { displayGame } from "./display-game.ts";

export function playThroughCli(rl: readline.Interface, game: Game) {
  try {
    // TODO : end of game (ticket CLI-9)
    const color =
      game.turnOfPlayer === "blue"
        ? chalk.blueBright(game.turnOfPlayer)
        : chalk.white(game.turnOfPlayer);

    let piece = 0;
    let column = -1;

    rl.question(`Player ${color}: which piece to play ?`, (answer) => {
      piece = Number.parseInt(answer);

      if (Number.isNaN(piece) || piece < 1 || piece > 7) {
        throw new Error(
          "Use the number displayed on top of the piece, ranging from 1 to 7.",
        );
      }
      rl.question(`In which column ?`, (answer) => {
        column = Number.parseInt(answer);

        if (Number.isNaN(column) || column < 0 || column > 8) {
          throw new Error("Enter the column number, ranging from 0 to 8.");
        }

        const move: Move = {
          skipped: false,
          color: game.turnOfPlayer,
          piece: pieceNumberToPieceName(piece),
          column,
          rotation: 0,
          mirrored: false,
        };

        const updatedGame = gameReducer(game, move);
        displayGame(updatedGame);
        playThroughCli(rl, updatedGame);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

function pieceNumberToPieceName(pieceNumber: number): Piece {
  switch (pieceNumber) {
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3I";
    case 4:
      return "3L";
    case 5:
      return "4S";
    case 6:
      return "4T";
    case 7:
      return "4L";
  }
  throw new Error(`Unknown piece number ${pieceNumber}`);
}
