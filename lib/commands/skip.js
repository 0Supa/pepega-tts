const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');
const ttsPlayer = require('../utils/ttsPlayer.js')

module.exports = {
    cooldown: 2,
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current playing TTS')
        .addBooleanOption(option =>
            option.setName('skip-all')
                .setDescription('Skip all queued TTS messages')),
    async execute(interaction) {
        const skipAll = interaction.options.getBoolean('skip-all');

        const channel = interaction.member.voice.channel;
        const connection = voice.getVoiceConnection(interaction.guild.id);

        if (!channel) return interaction.reply('You need to be in a voice channel');

        if (!connection) return interaction.reply("I'm not in a voice channel");

        if (channel.id !== connection.packets.state.channel_id) return interaction.reply('You need to be in the same voice channel as me')

        if (interaction.member.voice.serverDeaf || interaction.member.voice.serverMute) return interaction.reply('You are Server Muted/Deafened')

        let skip = ttsPlayer.skip
        let msg = '⏭️ Successfully skipped current TTS'
        if (skipAll) {
            skip = ttsPlayer.stop
            msg = '🛑 Successfully skipped and cleared queue'
        }

        const skipped = skip(interaction.guild.id)
        if (!skipped) return interaction.reply('There is no TTS message playing')

        interaction.reply(msg)
    },
};
