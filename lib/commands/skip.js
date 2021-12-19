const voice = require('@discordjs/voice');
const ttsPlayer = require('../utils/ttsPlayer.js')

module.exports = {
    name: 'skip',
    description: 'skips the current playing TTS',
    cooldown: 2,
    aliases: ['stop', 'skipall'],
    execute(client, message, commandName) {
        const channel = message.member.voice.channel;
        const connection = voice.getVoiceConnection(message.guild.id);

        if (!channel) return message.reply('You need to be in a voice channel');

        if (!connection) return message.reply("I'm not in a voice channel");

        if (channel.id !== connection.packets.state.channel_id) return message.reply('You need to be in the same voice channel as me')

        if (message.member.voice.serverDeaf || message.member.voice.serverMute) return message.reply('You are Server Muted/Deafened')

        let skip = ttsPlayer.skip
        let emoji = '⏭️'
        if (commandName !== 'skip') {
            skip = ttsPlayer.stop
            emoji = '🛑'
        }

        const skipped = skip(message.guild.id)
        if (!skipped) return message.reply('There is no TTS message playing')

        message.react(emoji)
    },
};