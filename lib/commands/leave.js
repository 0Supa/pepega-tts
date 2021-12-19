const { Permissions } = require('discord.js');
const voice = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'leaves the current voice channel',
    aliases: ['disconnect'],
    cooldown: 4,
    execute(client, message) {
        const channel = message.member.voice.channel;
        const connection = voice.getVoiceConnection(message.guild.id);

        if (!message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return message.reply('You need to have the `Move Members` permission to use this command')

        if (!channel) return message.reply('You need to be in a voice channel to do this');

        if (!connection) return message.reply("I'm not in a voice channel");

        if (channel.id !== connection.packets.state.channel_id) return message.reply('You need to be in the same voice channel as me')

        connection.destroy()
        message.react("🍃")
    },
};