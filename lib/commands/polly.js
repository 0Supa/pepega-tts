const textEncoder = new TextEncoder()

module.exports = {
    name: 'polly',
    description: 'send an Amazon Polly TTS message in your voice channel',
    aliases: ['p'],
    cooldown: 1,
    async execute(message) {
        const { ttsPlayer } = message.guild
        const { channel } = message.member.voice;
        const connection = message.guild.voice ? message.guild.voice.connection : null;;
        const byteLimit = 550
        const phrase = message.args.join(' ').replace(/<a?:(\w{2,32}):(\d{17,19})>/g, '$1')
        const phraseBytes = textEncoder.encode(phrase).length

        if (!message.args.length) return message.reply('you need to specify a message');

        if (phraseBytes > byteLimit) return message.reply(`your message is too long. The maximum is ${byteLimit} characters, you'll need to remove ${phraseBytes - byteLimit} characters`)

        if (!channel) return message.reply('you need to be in a voice channel first');

        if (connection && channel.id !== connection.channel.id) return message.reply('you need to be in the same voice channel as me')

        if (message.member.voice.serverDeaf || message.member.voice.selfDeaf || message.member.voice.serverMute) return message.reply('you are muted/deafened')

        if (connection) {
            ttsPlayer.polly(phrase, message.query.voice)
            message.react('🔊');
        } else {
            if (!channel.joinable) return message.reply('I cannot join your voice channel');
            await channel.join()
            setTimeout(() => {
                ttsPlayer.polly(phrase, message.query.voice)
            }, 1000);
            message.react('✅');
        }
    }
}