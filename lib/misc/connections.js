require('dotenv').config();
const mariadb = require('mariadb');
const redis = require('redis');
const asyncRedis = require("async-redis");
const Discord = require('discord.js');
const ttsExtension = require('../utils/ttsExtension.js')

Discord.Structures.extend('Guild', ttsExtension);

const client = new Discord.Client({ allowedMentions: { parse: [] } });

const pool = mariadb.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name,
    connectionLimit: process.env.db_connectionLimit,
});

const redisClient = redis.createClient(process.env.redis_port)
const cache = asyncRedis.decorate(redisClient);

module.exports = { Discord, client, pool, cache };