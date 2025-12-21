export async function commandMap(state) {
    const locations = await state.pokeApi.fetchLocations();
    if (locations)
        console.log(locations);
}
export async function commandMapb(state) {
    const previousLocations = await state.pokeApi.fetchPreviousLocations();
    if (previousLocations)
        console.log(previousLocations);
}
