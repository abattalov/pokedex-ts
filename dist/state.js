import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeApi } from "./pokeapi.js";
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
