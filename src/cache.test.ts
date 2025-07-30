import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Cache } from "./cache.js";

describe("Cache", () => {
  let cache: Cache<string>;

  beforeEach(() => {
    vi.useFakeTimers();
    cache = new Cache<string>(1000); // 1 sec
  });

  afterEach(() => {
    cache.stopReapLoop();
    vi.useRealTimers();
  });

  it("adds and retrieves an entry", () => {
    cache.add("foo", "bar");
    const entry = cache.get("foo");
    expect(entry?.val).toBe("bar");
    expect(typeof entry?.createdAt).toBe("number");
  });

  it("returns undefined for missing keys", () => {
    expect(cache.get("missing")).toBeUndefined();
  });

  it("removes expired entries after interval", () => {
    cache.add("foo", "bar");

    vi.advanceTimersByTime(1500);

    const entry = cache.get("foo");
    expect(entry).toBeUndefined();
  });

  it("does not remove fresh entries", () => {
    cache.add("foo", "bar");

    vi.advanceTimersByTime(500);

    const entry = cache.get("foo");
    expect(entry?.val).toBe("bar");
  });

  it("stops reap loop when stopReapLoop is called", () => {
    const spy = vi.spyOn(global, "setInterval");
    const clearSpy = vi.spyOn(global, "clearInterval");

    const newCache = new Cache<string>(1000);
    expect(spy).toHaveBeenCalled();

    newCache.stopReapLoop();
    expect(clearSpy).toHaveBeenCalled();
  });
});
