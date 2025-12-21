export class PokeApi {
    static baseURL = "https://pokeapi.co/api/v2";
    nextUrl = null;
    previousUrl = null;
    constructor() { }
    async fetchLocations() {
        try {
            const url = this.nextUrl || PokeApi.baseURL + "/location-area/";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            this.nextUrl = result.next;
            this.previousUrl = result.previous;
            const locations = {
                next: result.next,
                previous: result.previous,
                results: result.results,
            };
            if (locations)
                return locations;
        }
        catch (error) {
            console.error("Error:", error);
        }
        return {
            next: "",
            previous: null,
            results: [],
        };
    }
    async fetchPreviousLocations() {
        try {
            const url = this.previousUrl || PokeApi.baseURL + "/location-area/";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            this.nextUrl = result.next;
            this.previousUrl = result.previous;
            const locations = {
                next: result.next,
                previous: result.previous,
                results: result.results,
            };
            if (locations)
                return locations;
        }
        catch (error) {
            console.error("Error:", error);
        }
        return {
            next: "",
            previous: null,
            results: [],
        };
    }
    async fetchLocation(locationName) {
        try {
            const response = await fetch(PokeApi.baseURL + "/location-area/" + locationName);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            const location = {
                name: result.location.name,
                url: result.location.url,
            };
            if (location)
                return location;
        }
        catch (error) {
            console.error("Error:", error);
        }
        return { name: "", url: "" };
    }
}
