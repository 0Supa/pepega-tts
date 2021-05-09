module.exports = {
    name: 'stop',
    description: 'skips all the queued TTS messages',
    aliases: ['skipall', 'fuckoff'],
    cooldown: 2,
    execute(message) {
        const { ttsPlayer } = message.guild
        const connection = message.guild.voice ? message.guild.voice.connection : null;
        const { channel } = message.member.voice

        if (!channel) return message.reply('you need to be in a voice channel to do that');

        if (!connection) return message.reply("I'm not in a voice channel");

        if (channel.id !== connection.channel.id) return message.reply('you need to be in the same voice channel as me')

        if (message.member.voice.serverDeaf || message.member.voice.selfDeaf || message.member.voice.serverMute) return message.reply('you are muted/deafened')

        if (!ttsPlayer.queue.length) return message.reply('there are no TTS messages in queue')

        ttsPlayer.queue = [];
        ttsPlayer.polly('Successfully cleared queue', 'Brian')
        ttsPlayer.playNext()
        message.react("🛑")
    },
};