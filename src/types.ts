import { type Interface } from "node:readline";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => void;
};

export type State = {
	commands: Record<string, CLICommand>;
	rl: Interface;
};
