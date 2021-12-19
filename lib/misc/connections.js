const config = require('../../config.json')
const mariadb = require('mariadb');
const Redis = require("ioredis");

const pool = mariadb.createPool(config.database);

const redis = new Redis();

module.exports = { pool, redis };
