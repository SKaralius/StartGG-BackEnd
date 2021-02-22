import NodeCache from "node-cache";
import { getData } from "./util/functions.js";

const cache = new NodeCache();

export function initCache() {
    // Gets data initialy.
    getData();
}

export function mSetCache(setArray) {
    cache.mset(setArray);
}

export function getFromCache(key) {
    return cache.get(key);
}
