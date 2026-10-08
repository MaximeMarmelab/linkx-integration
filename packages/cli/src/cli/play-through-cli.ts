import type readline from "node:readline";

import chalk from "chalk";

import type { Game } from "../domain/game/game.ts";

import { gameReducer } from "../domain/game/run-game.ts";
import { parseSingularMove } from "../domain/state/gamestate-parser.ts";
import { displayGame } from "./display-game.ts";

export function playThroughCli(rl: readline.Interface, game: Game) {
  // TODO : end of game (ticket CLI-9)
  const color =
    game.turnOfPlayer === "blue"
      ? chalk.blueBright(game.turnOfPlayer)
      : chalk.white(game.turnOfPlayer);

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
