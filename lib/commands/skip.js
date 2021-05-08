module.exports = {
    name: 'skip',
    description: 'skips the current playing TTS',
    cooldown: 2,
    execute(message) {
        const { ttsPlayer } = message.guild
        const connection = message.guild.voice.connection ?? null;
        const { channel } = message.member.voice

        if (!channel) return message.reply('you need to be in a voice channel to do that.');

        if (!connection) return message.reply("I'm not in a voice channel.");

        if (channel.id !== connection.channel.id) return message.reply('you need to be in the same voice channel as me.')

        if (message.member.voice.serverDeaf || message.member.voice.selfDeaf || message.member.voice.serverMute) return message.reply('you are muted/deafened.')

        ttsPlayer.playNext()
        message.react("💨")
    },
};