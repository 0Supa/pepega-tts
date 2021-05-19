require('dotenv').config();

const cooldown = new Set();
const fs = require('fs');
const logger = require('./lib/utils/logger.js')
const utils = require('./lib/utils/utils.js')
const { Discord, client } = require('./lib/misc/connections.js')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./lib/commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    logger.info(`Connected to Discord (${client.user.tag})`);
    (function activity() {
        client.user.setActivity(";help");
        setTimeout(activity, 3600000);
    })();
});

client.on('guildCreate', async (guild) => {
    await utils.query(`INSERT INTO guilds (guild_id) VALUES (?)`, [guild.id])
    logger.info(`Joined ${guild.name}`)
});

client.on('guildDelete', async (guild) => {
    await utils.query(`DELETE FROM guilds WHERE guild_id=?`, [guild.id])
    await utils.cache.del(guild.id)
    logger.info(`Left ${guild.name}`)
});

client.on('message', async (message) => {
    if (message.author.bot || !message.guild) return;

    const cacheData = await utils.cache.get(message.guild.id)

    if (cacheData) message.query = JSON.parse(cacheData)
    else {
        const channelQuery = await utils.query(`SELECT prefix, voice, lang FROM guilds WHERE guild_id=? LIMIT 1`, [message.guild.id])

        if (!channelQuery.length) {
            await utils.query(`INSERT INTO guilds (guild_id) VALUES (?)`, [message.guild.id])
            message.react('📙')
            return;
        }

        message.query = channelQuery[0]

        await utils.cache.set(message.guild.id, JSON.stringify({ prefix: message.query.prefix, voice: message.query.voice, lang: message.query.lang }))
    }

    const prefix = message.query.prefix

    if (!message.content.startsWith(prefix)) return;

    message.args = message.cleanContent.slice(prefix.length).trim().split(/ +/);
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