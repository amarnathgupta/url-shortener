import { setCache, getCache, deleteCache } from "../config/in-memory.js";

export async function cacheSet(key, value) {
  return setCache(key, value);
}

export async function cacheGet(key) {
  return getCache(key);
}

export async function cacheDel(key) {
  return deleteCache(key);
}
