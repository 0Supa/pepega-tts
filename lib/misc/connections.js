require('dotenv').config();
const mariadb = require('mariadb');
const Redis = require("ioredis");
const Discord = require('discord.js-light');
const ttsExtension = require('../utils/ttsExtension.js')

Discord.Structures.extend('Guild', ttsExtension);

const client = new Discord.Client({
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] },
    allowedMentions: { parse: [] },
    cacheGuilds: true,
    cacheChannels: false,
    cacheOverwrites: false,
    cacheRoles: false,
    cacheEmojis: false,
    cachePresences: false
});

const pool = mariadb.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name,
    connectionLimit: process.env.db_connectionLimit,
});

const redis = new Redis();

module.exports = { Discord, client, pool, redis };