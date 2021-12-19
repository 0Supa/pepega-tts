const { Permissions } = require('discord.js');
const voice = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: 'joins your voice channel',
    aliases: ['connect'],
    cooldown: 4,
    execute(client, message) {
        const channel = message.member.voice.channel;
        const connection = voice.getVoiceConnection(message.guild.id);

        if (!channel) return message.reply('You need to be in a voice channel');

        if (connection) {
            if (connection._state.status === 'disconnected') return message.reply('Please wait a few seconds before summoning the bot again')
            if (channel.id === connection.packets.state.channel_id) return message.reply("I'm already in your voice channel")
            if (message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return join()
            return message.reply("I'm already in a voice channel")
        }

        join()
        async function join() {
            if (!channel.joinable) return message.reply('I cannot join your voice channel');

            voice.joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            message.react('🔗');
        }
    }
}