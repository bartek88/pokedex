import type { CLICommand, State } from "./types";

export async function commandHelp(state: State): Promise<void> {
  const { commands } = state;
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n\n");
  for (const key in commands) {
    console.log(`${commands[key].name}: ${commands[key].description}`);
  }
  console.log("\n");
}

export async function commandExit(state: State): Promise<void> {
  console.log("Closing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
}

export async function commandMap(state: State): Promise<void> {
  const locations = await state.api.fetchLocations();
  console.log("\n");
  locations.forEach((location) => console.log(location));
  console.log("\n");
}

export async function commandMapB(state: State): Promise<void> {
  const locations = await state.api.fetchLocations({ fetchPrevPage: true });
  console.log("\n");
  locations.forEach((location) => console.log(location));
  console.log("\n");
}

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (!args.length) {
    console.log("Expected 1 argument, got 0.");
    return;
  }
  console.log("Exploring pastoria-city-area...");

  const location = args[0];
  const pokemons = await state.api.getLocationPokemons(location);

  if (!pokemons.length) {
    console.log("No pokemons found.");
    return;
  }

  console.log("Found Pokemon:");
  pokemons.forEach((pokemon) => console.log(`  - ${pokemon}`));
}

export function getCommands(): Record<string, CLICommand> {
  return {
    explore: {
      name: "explore [area_name]",
      description:
        "Takes the name of a location area as an argumente and lists pokemons that can be found in that area.",
      callback: commandExplore,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description:
        "Displays the names of 20 location areas in the Pokemon world. Each subsequent call to map will display next 20 locations.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description:
        "Displays the names of 20 location areas in the Pokemon world. Each subsequent call to mapb will display previous 20 locations.",
      callback: commandMapB,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
