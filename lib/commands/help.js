const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: "DM's you the command list",
    aliases: ['commands', 'cmds'],
    cooldown: 8,
    execute(message, args) {
        const knownCommands = ['help', 'ping', 'prefix', 'join', 'polly', 'say', 'voice', 'lang']
        let help = ''
        for (let i = 0, len = knownCommands.length; i < len; i++) {
            const command = message.client.commands.get(knownCommands[i])
            help += `**${command.name}**${command.aliases ? ` \`${command.aliases.join(', ')}\` ` : ''}- ${command.description} - ${command.cooldown}s cooldown`
        }

        const embedhelp = new MessageEmbed()
            .setTitle("List of available commands")
            .setDescription(help)
            .setColor()
            .setThumbnail()

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