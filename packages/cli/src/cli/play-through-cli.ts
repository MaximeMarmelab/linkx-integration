import type readline from "node:readline";

import chalk from "chalk";

import type { Game } from "../domain/game/game.ts";

import { getPossibleMoves } from "../domain/game/get-possibles-moves.ts";
import { gameReducer } from "../domain/game/run-game.ts";
import { parseSingularMove } from "../domain/state/gamestate-parser.ts";
import { displayGame } from "./display-game.ts";

export function playThroughCli(rl: readline.Interface, game: Game) {
  const color =
    game.turnOfPlayer === "blue"
      ? chalk.blueBright(game.turnOfPlayer)
      : chalk.white(game.turnOfPlayer);

  if (getPossibleMoves(game).length === 0) {
    console.log(`Player ${color}: turn skipped due to lack of possible moves.`);
    const skipMove = {
      skipped: true,
      color: game.turnOfPlayer,
    };
    if (game.lastMove?.skipped) {
      // TODO calculate biggest area in future ticket
      console.log(
        "Game ended in a draw: both players cannot play legal moves anymore.",
      );
      rl.close();
      return;
    }
    playThroughCli(rl, gameReducer(game, skipMove));
    return;
  }

  rl.question(`Player ${color}: enter a move to play\n`, (answer) => {
    try {
      const parsedMove = parseSingularMove(game.turnOfPlayer, answer);

      const updatedGame = gameReducer(game, parsedMove);
      displayGame(updatedGame);
      playThroughCli(rl, updatedGame);
    } catch (err: any) {
      console.log(err.message);
      playThroughCli(rl, game); // Re-starting the turn
    }
  });
}
