import { State } from "./types.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter(Boolean);
}

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();
  rl.on("line", async (line) => {
    if (!line.length) {
      rl.prompt();
      return;
    }
    try {
      const userInput = cleanInput(line);
      const command = userInput[0];
      const args = userInput.slice(1);
      if (!commands[command]) {
        console.log("Unknown command");
      } else {
        await commands[command].callback(state, ...args);
      }
    } catch (error) {
      console.log(error);
    }
    rl.prompt();
  });
}
