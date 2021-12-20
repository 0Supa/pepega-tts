const { Client, Intents } = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
    allowedMentions: { parse: [] },
})

const { getVoiceConnection } = require('@discordjs/voice');

const config = require('./config.json')
const fs = require('fs')
const logger = require('./lib/utils/logger.js')
const utils = require('./lib/utils/utils.js')

client.commands = new Map();
client.aliases = new Map();
const cooldown = new Set();

const commandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command = require(`./lib/commands/${file}`);
    if (!command.aliases) command.aliases = [];

    client.commands.set(command.name, command);

    for (const alias of command.aliases) {
        client.aliases.set(alias, command.name);
    }
}

client.on('ready', () => {
    logger.info(`Connected to Discord (${client.user.tag})`);
    client.user.setActivity(";help");
});

client.on('guildCreate', async (guild) => {
    const { prefix, voice, lang } = config.defaultValues
    await utils.query(`INSERT INTO guilds (guild_id, prefix, voice, lang) VALUES (?, ?, ?, ?)`, [guild.id, prefix, voice, lang])
    logger.info(`Joined ${guild.name}`)
});

client.on('guildDelete', async (guild) => {
    await utils.query(`DELETE FROM guilds WHERE guild_id=?`, [guild.id])
    await utils.redis.del(`pt:guild:${guild.id}`)
    logger.info(`Left ${guild.name}`)
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.id === client.user.id && newMember.channel &&
        !newMember.channel.members.filter(a => !a.user.bot).size) return getVoiceConnection(oldMember.guild.id)?.destroy()

    if (oldMember.channel && oldMember.channelId === oldMember.guild.me.voice.channelId &&
        !oldMember.channel.members.filter(a => !a.user.bot).size) return getVoiceConnection(oldMember.guild.id)?.destroy()
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const cacheData = await utils.redis.get(`pt:guild:${message.guild.id}`)

    if (cacheData) message.query = JSON.parse(cacheData)
    else {
        const channelQuery = await utils.query(`SELECT prefix, voice, lang FROM guilds WHERE guild_id=? LIMIT 1`, [message.guild.id])

        if (!channelQuery.length) {
            const { prefix, voice, lang } = config.defaultValues
            await utils.query(`INSERT INTO guilds (guild_id, prefix, voice, lang) VALUES (?, ?, ?, ?)`, [message.guild.id, prefix, voice, lang])
            message.query = { prefix, voice, lang }
        } else message.query = channelQuery[0]

        await utils.redis.set(`pt:guild:${message.guild.id}`, JSON.stringify({ prefix: message.query.prefix, voice: message.query.voice, lang: message.query.lang }))
    }

    const prefix = message.query.prefix

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    message.args = message.cleanContent.slice(prefix.length).trim().split(/ +/);
    const commandName = message.args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

    if (!command) return;
    if (cooldown.has(`${command.name} ${message.author.id}`)) return message.react('🐌')

    try {
        command.execute(client, message, commandName);
        if (command.cooldown) {
            cooldown.add(`${command.name} ${message.author.id}`);
            setTimeout(() => {
                cooldown.delete(`${command.name} ${message.author.id}`);
            }, command.cooldown * 1000);
        }
        logger.info(`${message.author.username} executed command ${command.name} in ${message.guild.name}`);
    } catch (err) {
        console.error(err);
        message.reply("An unexpected error occurred");
    }
});

client.login(config.token);
