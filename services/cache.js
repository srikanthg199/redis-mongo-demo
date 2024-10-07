const mongoose = require('mongoose');
const util = require('util');
const redis = require('redis');

// Initialize Redis client for redis@3.x
const client = redis.createClient("redis://127.0.0.1:6379");
client.hget = util.promisify(client.hget);

// Store original Mongoose exec method
const exec = mongoose.Query.prototype.exec;


mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || "");
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }
    const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));
    const cacheValue = await client.hget(this.hashKey, key);

    if (cacheValue) {
        console.log("Data from redis(cache)...");
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 60 * 60);  // 1-hour expiration
    console.log("Data from DB(mongo)...");
    return result;
};

const clearHash = async function (hashKey) {
    await client.del(JSON.stringify(hashKey));
    console.log("Cache cleared");
}

const clearAllCache = async function () {
    await client.flushdb();
    console.log("All cache cleared");
}

module.exports = { clearHash, clearAllCache };
