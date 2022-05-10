const voice = require('@discordjs/voice');
const ttsPlayer = require('./ttsPlayer.js')

module.exports = async (interaction, phrase, characterLimit) => {
    const channel = interaction.member.voice.channel;
    const connection = voice.getVoiceConnection(interaction.guild.id);

    if (phrase.length > characterLimit) return `Your message is too long. The maximum is ${characterLimit} characters, you'll need to remove ${phrase.length - characterLimit} characters`

    if (!channel) return 'You need to be in a voice channel'

    if (interaction.member.voice.serverDeaf || interaction.member.voice.serverMute) return 'You are Server Muted/Deafened'

    if (connection) {
        if (connection._state.status === 'disconnected') return 'Please wait a few seconds before summoning the bot again'
        if (channel.id !== connection.packets.state.channel_id) return 'You need to be in the same voice channel as me'

        await interaction.reply(`🔊 ${phrase}`)
        setTimeout(() => {
            interaction.deleteReply().catch(error => {
                if (error.code !== 10008) console.error('Failed to delete reply:', error);
            })
        }, 120000);
    } else {
        if (!channel.joinable) return 'I cannot join your voice channel'

        ttsPlayer.resetGuild(interaction.guild.id)
        ttsPlayer.createVoiceConnection({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        })

        interaction.reply(`🔗 Successfully joined <#${channel.id}>`);
    }

    ttsPlayer.init(interaction.guild.id)
}