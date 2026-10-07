import path from "node:path";
import { argv } from "node:process";

import { runGame } from "./domain/game/run-game.ts";

let inputPath: string | undefined;

argv.forEach((arg) => {
  if (arg.startsWith("--file=")) {
    const inputPartialPath = arg.substring(7);
    if (inputPartialPath.startsWith("/") || inputPartialPath.length == 0) {
      inputPath = inputPartialPath;
    } else {
      inputPath = path.join(process.cwd(), inputPartialPath);
    }
  }
});

runGame(inputPath);
