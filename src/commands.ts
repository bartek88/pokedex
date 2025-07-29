import type { CLICommand, State } from "./types";

export function commandHelp(state: State) {
	const { commands } = state;
	console.log("\nWelcome to the Pokedex!");
	console.log("Usage:\n\n");
	for (const key in commands) {
		console.log(`${commands[key].name}: ${commands[key].description}`);
	}
	console.log("\n");
}

export function commandExit(state: State) {
	console.log("Closing the Pokedex... Goodbye!");
	state.rl.close();
	process.exit(0);
}

export function getCommands(): Record<string, CLICommand> {
	return {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		exit: {
			name: "exit",
			description: "Exit the Pokedex",
			callback: commandExit,
		},
	};
}
