import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeApi } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void | Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeApi;
};

export function initState() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });

  return {
    readline: rl,
    commands: getCommands(),
    pokeApi: new PokeApi()
  };
}