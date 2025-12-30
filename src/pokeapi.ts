import { Cache } from "./pokecache.js";

const cache = new Cache(60000);

export class PokeApi {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private nextUrl: string | null = null;
  private previousUrl: string | null = null;

  constructor() {}

  async fetchLocations(): Promise<ShallowLocations> {
    const url = this.nextUrl || PokeApi.baseURL + "/location-area/";

    const cached = cache.get<ShallowLocations>(url);
    if (cached) return cached;

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

      if (locations) return locations;
    } catch (error) {
      console.error("Error:", error);
    }

    return {
      next: "",
      previous: null,
      results: [],
    };
  }

  async fetchPreviousLocations(): Promise<ShallowLocations> {
    const url = this.previousUrl || PokeApi.baseURL + "/location-area/";
    const cached = cache.get<ShallowLocations>(url);

    if (cached) return cached;

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

      if (locations) return locations;
    } catch (error) {
      console.error("Error:", error);
    }

    return {
      next: "",
      previous: null,
      results: [],
    };
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = PokeApi.baseURL + "/location-area/" + locationName;

    const cached = cache.get<Location>(url);
    if (cached) return cached;

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
    } catch (error) {
      console.error("Error:", error);
    }

    return { name: "", url: "" };
  }
}

export type ShallowLocations = {
  next: string;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  name: string;
  url: string;
};
