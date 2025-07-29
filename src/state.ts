import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { State } from "./types";

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });
  const commands = getCommands();

  return {
    commands,
    rl,
  };
}
