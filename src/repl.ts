import { State } from "./types.js";

export function cleanInput(input: string): string[] {
	return input.toLowerCase().trim().split(" ").filter(Boolean);
}

export function startREPL(state: State) {
	const { rl, commands } = state;

	rl.prompt();
	rl.on("line", (line) => {
		if (!line.length) {
			rl.prompt();
			return;
		}
		try {
			if (!commands[line]) {
				console.log("Unknown command");
			} else {
				commands[line].callback(state);
			}
		} catch (error) {
			console.log(error);
		}
		rl.prompt();
	});
}
