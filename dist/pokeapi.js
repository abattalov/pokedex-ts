import { Cache } from "./pokecache.js";
const cache = new Cache(60000);
export class PokeApi {
    static baseURL = "https://pokeapi.co/api/v2";
    nextUrl = null;
    previousUrl = null;
    constructor() { }
    async fetchLocations() {
        const url = this.nextUrl || PokeApi.baseURL + "/location-area/";
        const cached = cache.get(url);
        if (cached)
            return cached;
        try {
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
            cache.add(url, locations);
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
        const url = this.previousUrl || PokeApi.baseURL + "/location-area/";
        const cached = cache.get(url);
        if (cached)
            return cached;
        try {
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
            cache.add(url, locations);
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
        const url = PokeApi.baseURL + "/location-area/" + locationName;
        const cached = cache.get(url);
        if (cached)
            return cached;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            const location = {
                name: result.location.name,
                url: result.location.url,
            };
            cache.add(url, location);
            return location;
        }
        catch (error) {
            console.error("Error:", error);
        }
        return { name: "", url: "" };
    }
}
