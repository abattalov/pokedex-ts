import { initState } from "./state.js";
export function startREPL() {
    const state = initState();
    state.interface.prompt();
    state.interface.on("line", (input) => {
        const trimmedInput = input.trim();
        const commands = state.commands;
        if (commands[trimmedInput]) {
            commands[trimmedInput].callback(state);
        }
        else {
            console.log("Unknown command");
        }
        if (trimmedInput === "") {
            state.interface.prompt();
        }
        try {
            state.interface.prompt();
        }
        catch (err) {
            if (err instanceof Error) {
                console.log("Error: ", err.message);
            }
            else {
                console.error("Error:", err);
            }
        }
    });
}
export function cleanInput(input) {
    const wordsArr = input.toLowerCase().trim().split(" ");
    return wordsArr;
}
