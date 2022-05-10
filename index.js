const { Client, Intents } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getVoiceConnection } = require('@discordjs/voice');

const config = require('./config.json')
const fs = require('fs')
const logger = require('./lib/utils/logger.js')
const utils = require('./lib/utils/utils.js')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
    allowedMentions: { parse: [] },
});
const rest = new REST({ version: '9' }).setToken(config.token);

client.commands = new Map();
const slashCommands = [];
const cooldown = new Set();

const commandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./lib/commands/${file}`);
    if (!command.data) console.log(command)
    client.commands.set(command.data.name, command)
    slashCommands.push(command.data.toJSON());
}

client.on('ready', async () => {
    logger.info(`Connected to Discord (${client.user.tag})`);
    client.user.setActivity("/help");

    try {
        logger.info('Refreshing Discord slash commands');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: slashCommands },
        );
        logger.info('Successfully reloaded Discord slash commands');
    } catch (err) {
        console.error(err);
    }
});

client.on('guildCreate', async (guild) => {
    const { voice, lang } = config.defaultValues
    await utils.query(`INSERT INTO guilds (guild_id, voice, lang) VALUES (?, ?, ?)`, [guild.id, voice, lang])
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

    const data = await utils.redis.get(`pt:guild:${message.guild.id}`)
    if (!data) return
    if (!message.content.toLowerCase().startsWith(data.prefix)) return
    if (cooldown.has(`old_${message.guild.id}`)) return

    message.args = message.content.slice(prefix.length).trim().split(/ +/)

    const oldCommands = ['help', 'tts', 'polly', 'p', 'google', 'g']
    const commandName = message.args.shift().toLowerCase()

    if (!oldCommands.includes(commandName)) return;

    cooldown.add(`old_${message.guild.id}`);
    setTimeout(() => {
        cooldown.delete(`old_${message.guild.id}`);
    }, 30000);

    message.reply("🎉 Pepega TTS has migrated to Discord Slash Commands\nPlease type slash `/` to use all the TTS commands\n\n* If you don't see any commands please contact your Server Manager to add the bot again, using the \"Add to Server\" button when clicking on the bot's Discord profile")
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const cacheData = await utils.redis.get(`pt:guild:${interaction.guild.id}`)

    if (cacheData) interaction.query = JSON.parse(cacheData)
    else {
        const channelQuery = await utils.query(`SELECT voice, lang FROM guilds WHERE guild_id=? LIMIT 1`, [interaction.guild.id])

        if (!channelQuery.length) {
            await utils.query(`INSERT INTO guilds (guild_id, voice, lang) VALUES (?, ?, ?)`, [interaction.guild.id, voice, lang])
            interaction.query = { voice, lang }
        } else interaction.query = channelQuery[0]

        await utils.redis.set(`pt:guild:${interaction.guild.id}`, JSON.stringify({ voice: interaction.query.voice, lang: interaction.query.lang }))
    }

    const command = client.commands.get(interaction.commandName)

    if (!command) return interaction.reply({ content: 'Command not found', ephemeral: true });
    if (cooldown.has(`${interaction.commandName} ${interaction.user.id}`)) return interaction.reply({ content: 'This command is on cooldown 🐌', ephemeral: true });

    try {
        command.execute(interaction);
        if (command.cooldown) {
            cooldown.add(`${interaction.commandName} ${interaction.user.id}`);
            setTimeout(() => {
                cooldown.delete(`${interaction.commandName} ${interaction.user.id}`);
            }, command.cooldown * 1000);
        }
        logger.info(`${interaction.user.username} executed command ${interaction.commandName} in ${interaction.guild.name}`);
    } catch (err) {
        console.error(err);
        interaction.reply({ content: "We're sorry, an unexpected error occurred 😕", ephemeral: true });
    }
});

client.login(config.token);
