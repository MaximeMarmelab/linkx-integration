import { argv } from "node:process";

import { runGame } from "./domain/game/run-game.ts";

let inputFile: string | undefined;

argv.forEach((arg) => {
  if (arg.startsWith("--file=")) {
    inputFile = arg.substring(7);
  }
});

runGame(inputFile);
