import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";
import readline from "node:readline";

import { displayGame } from "./cli/display-game.ts";
import { playThroughCli } from "./cli/play-through-cli.ts";
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

let fileContent = "";
if (inputPath) {
  try {
    fileContent = readFileSync(inputPath, "utf8");
  } catch (err) {
    console.error("Couldn't read file. " + err);
  }
}
try {
  let game = runGame(fileContent);
  displayGame(game);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  playThroughCli(rl, game);
} catch (err: any) {
  console.error(
    `The file given contains the following problem :\n${err.message}`,
  );
}
