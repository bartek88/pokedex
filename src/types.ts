import type { Interface } from "node:readline";
import type { PokeAPI } from "./pokeapi";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  api: PokeAPI;
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

type Location = {
  name: string;
  url: string;
};

type EncounterMethodRate = {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
};

type EncounterMethod = {
  name: string;
  url: string;
};

type VersionDetail = {
  rate: number;
  version: Version;
};

type Version = {
  name: string;
  url: string;
};

type Name = {
  name: string;
  language: Language;
};

type Language = {
  name: string;
  url: string;
};

type PokemonEncounter = {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
};

type Pokemon = {
  name: string;
  url: string;
};

type VersionDetail2 = {
  version: Version2;
  max_chance: number;
  encounter_details: EncounterDetail[];
};

type Version2 = {
  name: string;
  url: string;
};

type EncounterDetail = {
  min_level: number;
  max_level: number;
  condition_values: any[];
  chance: number;
  method: Method;
};

type Method = {
  name: string;
  url: string;
};
