import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapb } from "./command_map.js";

import type { CLICommand } from "./state.js";

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
    map: {
      name: "map",
      description: "Displays the names of 20 location areas.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the names of the previous 20 location areas",
      callback: commandMapb
    }
  };
}
