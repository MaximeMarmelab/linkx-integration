import { readFile } from "node:fs/promises";
import path from "node:path";
import { argv } from "node:process";

import { displayGame } from "./cli/display-game.ts";
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

if (inputPath) {
  readFile(inputPath, "utf8")
    .then((fileContent) => {
      const grid = runGame(fileContent);
      displayGame(grid);
    })
    .catch((err) => {
      console.error("Couldn't read file. " + err);
    });
} else {
  const grid = runGame();
  displayGame(grid);
}
