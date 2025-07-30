import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokemonType, State } from "./types";
import { PokeAPI } from "./pokeapi.js";

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });
  const commands = getCommands();
  const api = new PokeAPI();
  const pokedex = new Map<string, PokemonType>();

  return {
    commands,
    rl,
    api,
    pokedex,
  };
}
