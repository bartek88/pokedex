import { CacheEntry } from "./types";

export class Cache<T> {
  #cache: Map<string, CacheEntry<T>>;
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;
  #reap() {
    this.#cache.forEach((val, key, map) => {
      if (Date.now() - val.createdAt >= this.#interval) {
        map.delete(key);
      }
    });
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }

  constructor(interval: number) {
    this.#cache = new Map<string, CacheEntry<T>>();
    this.#interval = interval;
    this.#reapIntervalId = undefined;
    this.#startReapLoop();
  }

  add(key: string, value: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: value,
    };
    this.#cache.set(key, entry);
  }

  get(key: string): CacheEntry<T> | undefined {
    return this.#cache.get(key);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
