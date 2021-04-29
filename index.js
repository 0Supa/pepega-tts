require('dotenv').config();
let utils = {};

const cooldown = new Set();
const mariadb = require('mariadb');
const redis = require('redis');
const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const { logger } = require('./lib/utils/logger.js')

const pool = mariadb.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name,
});

(async () => {
    utils.db = await pool.getConnection()
})();

utils.cache = redis.createClient(process.env.redis_port)

utils.query = function (query, data = []) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await utils.db.query(query, data)
            resolve(res)
        } catch (err) {
            reject(err)
            console.error(err)
        }
    })
}

utils.cacheGet = function (param) {
    return new Promise(async (resolve, reject) => {
        utils.cache.get(param, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./lib/commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    logger.info(`Connected to Discord (${client.user.tag})`);
});

client.on('guildCreate', async (guild) => {
    await utils.query(`INSERT INTO guilds (guild_id) VALUES (?)`, [guild.id])
    logger.info(`Joined ${guild.name}`)
});

client.on('guildDelete', async (guild) => {
    await utils.query(`DELETE FROM guilds WHERE guild_id=?`, [guild.id])
    logger.info(`Left ${guild.name}`)
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.channelID !== oldMember.guild.me.voice.channelID || !oldMember.channel || oldMember.bot) return;
    if (!oldMember.channel.members.filter(a => !a.user.bot).size) {
        oldMember.channel.leave()
        logger.info(`Left ${oldMember.channel.name} in ${oldMember.guild.name} due to members size`);
    }
});

client.on('message', async (message) => {
    if (message.author.bot || !message.guild) return;

    console.time('redis')
    const cacheData = await utils.cacheGet(message.guild.id)
    console.timeEnd('redis')
    console.log(cacheData)

    if (false) {
        message.query = JSON.parse(cacheData)
    } else {
        console.log('Fetching from database..')
        console.time('sql')
        const channelQuery = await utils.query(`SELECT prefix, voice, lang FROM guilds WHERE guild_id=? LIMIT 1`, [message.guild.id])
        console.timeEnd('sql')

        if (!channelQuery.length) {
            await utils.query(`INSERT INTO guilds (guild_id) VALUES (?)`, [message.guild.id])
            message.react('📙')
            return;
        }

        message.query = channelQuery[0]

        utils.cache.set(message.guild.id, JSON.stringify({ prefix: message.query.prefix, voice: message.query.voice, lang: message.query.lang }))
    }

    const prefix = message.query.prefix

    if (!message.content.startsWith(prefix)) return;

    message.args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = message.args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(command => command.aliases?.includes(commandName))

    if (!command) return;
    if (cooldown.has(`${command.name} ${message.author.id}`)) return message.react('🐌')

    try {
        command.execute(message, utils);
        if (command.cooldown) {
            cooldown.add(`${command.name} ${message.author.id}`);
            setTimeout(() => {
                cooldown.delete(`${command.name} ${message.author.id}`);
            }, command.cooldown * 1000);
        }
        logger.info(`${message.author.username} executed command ${command.name} in ${message.guild.name}`);
    } catch (err) {
        console.error(err);
        message.reply("an error occurred");
    }
});

client.login(process.env.token);