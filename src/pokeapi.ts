import { Cache } from "./cache.js";
import { LocationArea, Result, ShallowLocations } from "./types";

export class PokeAPI {
  static readonly #baseURL = "https://pokeapi.co/api/v2";
  static readonly #resultsPerPage = 20;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  locationsCache: Cache<LocationArea>;
  pokemonsCache: Cache<string[]>;

  constructor() {
    this.nextPageUrl =
      "https://pokeapi.co/api/v2/location-area?offset=0&limit=20";
    this.prevPageUrl =
      "https://pokeapi.co/api/v2/location-area?offset=0&limit=20";
    this.locationsCache = new Cache(600000); // 10 mins
    this.pokemonsCache = new Cache(600000);
  }

  async fetchLocations({
    fetchPrevPage = false,
  }: { fetchPrevPage?: boolean } = {}): Promise<ShallowLocations> {
    try {
      if (!this.nextPageUrl) {
        throw new Error("No more results");
      }
      if (fetchPrevPage && !this.prevPageUrl) {
        throw new Error("You're on the first page");
      }

      const usedUrl = fetchPrevPage ? this.prevPageUrl! : this.nextPageUrl!;
      const cachedResults = this.locationsCache.get(usedUrl);
      let data: LocationArea;

      if (cachedResults) {
        console.log("Data loaded from cache:");
        data = cachedResults.val;
      } else {
        const response = await fetch(usedUrl);
        data = await response.json();
        this.locationsCache.add(usedUrl, data);
      }

      const { next, previous, results } = data;

      this.nextPageUrl = next;
      this.prevPageUrl = previous;

      return results.map((location) => location.name);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return [];
    }
  }

  async getLocationPokemons(location: string): Promise<string[]> {
    try {
      const cachedResults = this.pokemonsCache.get(location);

      if (cachedResults) return cachedResults.val;

      const fullUrl = `${PokeAPI.#baseURL}/location-area/${location}`;
      const response = await fetch(fullUrl);

      if (response.status == 404) {
        return [];
      }

      const data: Result = await response.json();

      const pokemons = data.pokemon_encounters.map((pe) => pe.pokemon.name);
      this.pokemonsCache.add(location, pokemons);

      return pokemons;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return [];
    }
  }
}
