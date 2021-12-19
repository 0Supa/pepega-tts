const voice = require('@discordjs/voice');
const ttsPlayer = require('../utils/ttsPlayer.js')

const characterLimit = 600

module.exports = {
    name: 'tts',
    description: 'send a TTS message in your current voice channel',
    aliases: ['polly', 'p', 'google', 'g'],
    cooldown: 1,
    async execute(client, message, commandName) {
        if (commandName === 'tts') {
            return message.reply(`Use \`${message.query.prefix}polly\` for the Polly TTS engine or \`${message.query.prefix}google\` for the Google TTS engine, followed by your message`)
        }

        const channel = message.member.voice.channel;
        const connection = voice.getVoiceConnection(message.guild.id);

        const phrase = message.args.join(' ').replace(/<a?:(\w{2,32}):(\d{17,19})>/g, '$1')

        if (!message.args.length) return message.reply('You need to specify a message');

        if (phrase.length > characterLimit) return message.reply(`Your message is too long. The maximum is ${characterLimit} characters, you'll need to remove ${phrase.length - characterLimit} characters`)

        if (!channel) return message.reply('You need to be in a voice channel');

        if (message.member.voice.serverDeaf || message.member.voice.serverMute) return message.reply('You are Server Muted/Deafened')

        if (connection) {
            if (connection._state.status === 'disconnected') return message.reply('Please wait a few seconds before summoning the bot again')
            if (channel.id !== connection.packets.state.channel_id) return message.reply('You need to be in the same voice channel as me')

            message.react('🔊');
        } else {
            if (!channel.joinable) return message.reply('I cannot join your voice channel');

            ttsPlayer.resetGuild(message.guild.id)
            ttsPlayer.createVoiceConnection({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })

            message.react('🔗');
        }

        ttsPlayer.init(message.guild.id)

        if (commandName === 'p' || commandName === 'polly')
            ttsPlayer.polly(message.guild.id, phrase, message.query.voice)
        else
            ttsPlayer.google(message.guild.id, phrase, message.query.lang)
    }
}