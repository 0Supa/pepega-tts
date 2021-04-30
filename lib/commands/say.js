const { google } = require('../utils/tts.js')

module.exports = {
    name: 'say',
    description: 'send a Google TTS message in your voice channel',
    aliases: ['s', 'g'],
    cooldown: 1,
    async execute(message) {
        const { channel } = message.member.voice;
        const connection = message.guild.voice?.connection;
        const characterLimit = 200
        const phrase = message.args.join(' ').replace(/<a?:(\w{2,32}):(\d{17,19})>/g, '$1')
        const phraseLength = phrase.length

        if (!message.args.length) return message.reply('you need to specify a message');

        if (phraseLength > characterLimit) return message.reply(`your message is too long. The maximum is ${characterLimit} characters, you'll need to remove ${phraseLength - characterLimit} characters`)

        if (!channel) return message.reply('you need to be in a voice channel first');

        if (channel.id !== connection?.channel.id) return message.reply('you need to be in the same voice channel as me')

        if (!channel.joinable) return message.reply('I cannot join your voice channel');

        if (message.member.voice.serverDeaf || message.member.voice.selfDeaf || message.member.voice.serverMute) return message.reply('you are muted/deafened')

        try {
            const ttsURL = google(phrase, message.query.lang)
            if (connection) {
                if (connection.speaking.bitfield) return message.reply("the current TTS command isn't done")
                connection.play(ttsURL)
                message.react('🔊');
            } else {
                const connection = await channel.join()
                connection.play(ttsURL)
                message.react('✅');
            }
        } catch (e) {
            console.error(e)
            message.reply(`error: ${e.message}`)
        }
    }
}