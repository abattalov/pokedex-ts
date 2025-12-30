import { Cache } from "./pokecache.js";
import { test, expect, vi } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("Cache reaps entries after $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  
  cache.add(key, val);
  expect(cache.get(key)).toBe(val);
  
  // Wait for two intervals to ensure reap has run
  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  
  expect(cache.get(key)).toBe(undefined);
  
  cache.stopReapLoop();
});