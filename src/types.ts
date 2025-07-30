import type { Interface } from "node:readline";
import type { PokeAPI } from "./pokeapi";
import {
  Ability,
  Cries,
  EncounterMethodRate,
  Form,
  HeldItem,
  Index,
  Mfe,
  Name,
  PastAbility,
  PastType,
  PokemonEncounter,
  Species,
  Sprites,
  Stat,
  Type,
} from "./helperTypes";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  api: PokeAPI;
  pokedex: Map<string, PokemonType>;
};

export type ShallowLocations = string[];

export type LocationArea = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export type Result = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: Location;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

export type PokemonType = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: Index[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Mfe[];
  species: Species;
  sprites: Sprites;
  cries: Cries;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
  past_abilities: PastAbility[];
};
