import crypto from 'crypto';
import NodeCache from "node-cache";

const cache = new NodeCache();

const cache_ttl_secs = 60 * 60 * 24; // 24 hours

export const save_cache = (query, response) => {
    cache.set(getCacheKey(query), response, cache_ttl_secs)
}

export const get_cache = (query) => {
    return cache.get(getCacheKey(query));
}

function getCacheKey(query) {
  query = query.trim().toLowerCase();
  return crypto.createHash('md5').update(query).digest('hex');
}