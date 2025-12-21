import { State } from "./state.js"

export async function commandMap(state: State){
    const locations = await state.pokeApi.fetchLocations();
    if(locations)
        console.log(locations)
}

export async function commandMapb(state: State){
    const previousLocations = await state.pokeApi.fetchPreviousLocations()
    if(previousLocations)
        console.log(previousLocations);
}
