const { MessageEmbed } = require("discord.js");
const { embed } = require('../utils/constants.js')

module.exports = {
    name: 'help',
    description: "DM's you the command list",
    aliases: ['commands', 'cmds'],
    cooldown: 8,
    execute(message, args) {
        const knownCommands = ['help', 'ping', 'prefix', 'join', 'polly', 'say', 'voice', 'lang']

        const embedhelp = new MessageEmbed()
            .setTitle("List of available commands")
            .setColor(embed.color)
            .setThumbnail('https://cdn.frankerfacez.com/emoticon/312720/2')

        for (let i = 0, len = knownCommands.length; i < len; i++) {
            const command = message.client.commands.get(knownCommands[i])
            embedhelp.addField(`\u200b`, `**${command.name.toUpperCase()}** - ${command.description}
            ${command.aliases ? `__Aliases__: ${command.aliases.join(', ')}` : ''}
            __Cooldown__: ${command.cooldown}s`)
        }

        message.author.send({ embed: embedhelp })
            .catch((e) => {
                if (e == "DiscordAPIError: Cannot send messages to this user") {
                    message.reply("you must allow direct messages from server members.")
                } else {
                    throw e;
                }
            });
        message.react('📩')
    },
};