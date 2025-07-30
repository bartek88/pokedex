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

export async function commandCatch(state: State, ...args: string[]) {
  if (!args.length) {
    console.log("Expected 1 argument, got 0.");
    return;
  }

  const pokemon = args[0];

  try {
    const pokemonData = await state.api.getPokemon(pokemon);

    console.log(`Throwing a Pokeball at ${pokemon}...`);

    const userScore = Math.ceil(Math.random() * 100);
    const pokemonDefense = pokemonData.stats.find(
      (stat) => stat.stat.name == "defense"
    )?.base_stat;

    if (!pokemonDefense) {
      console.log(`${pokemon} escaped!`);
      return;
    }

    if (userScore > pokemonDefense) {
      console.log(`${pokemon} was caught!`);
      state.pokedex.set(pokemon, pokemonData);
    } else {
      console.log(`${pokemon} escaped!`);
    }
  } catch (error) {
    return;
  }
}

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (!args.length) {
    console.log("Expected 1 argument, got 0.");
    return;
  }

  const pokemon = args[0];
  const pokemonData = state.pokedex.get(pokemon);

  if (!pokemonData) {
    console.log("You have not caught that pokemon yet.");
    return;
  }

  const { name, height, weight, stats, types } = pokemonData;

  console.log(`Name: ${name}`);
  console.log(`Height: ${height}`);
  console.log(`Weight: ${weight}`);
  console.log("Stats:");
  stats.forEach((stat) =>
    console.log(`  - ${stat.stat.name}: ${stat.base_stat}`)
  );
  console.log("Types:");
  types.forEach((type) => console.log(`  - ${type.type.name}`));
}

export async function commandPokedex(
  state: State,
  ...args: string[]
): Promise<void> {
  console.log("Your Pokedex:");
  if (state.pokedex.size === 0) {
    console.log(`  No data.`);
    return;
  }
  state.pokedex.forEach((_value, key) => console.log(`  - ${key}`));
}

export function getCommands(): Record<string, CLICommand> {
  return {
    catch: {
      name: "catch [pokemon_name]",
      description:
        "Takes the name of a pokemon as an argument and tries to catch it. If succeed - adds it to the pokedex.",
      callback: commandCatch,
    },
    explore: {
      name: "explore [area_name]",
      description:
        "Takes the name of a location area as an argument and lists pokemons that can be found in that area.",
      callback: commandExplore,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    inspect: {
      name: "inspect",
      description:
        "It takes the name of a Pokemon and prints the name, height, weight, stats and type(s) of the Pokemon.",
      callback: commandInspect,
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
    pokedex: {
      name: "pokedex",
      description:
        "Prints a list of all the names of the Pokemon the user has caught.",
      callback: commandPokedex,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
