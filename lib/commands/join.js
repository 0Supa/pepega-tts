const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const voice = require('@discordjs/voice');

module.exports = {
    cooldown: 4,
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins your voice channel'),
    execute(interaction) {
        const channel = interaction.member.voice.channel;
        const connection = voice.getVoiceConnection(interaction.guild.id);

        if (!channel) return interaction.reply('You need to be in a voice channel');

        if (connection) {
            if (connection._state.status === 'disconnected') return interaction.reply('Please wait a few seconds before summoning the bot again')
            if (channel.id === connection.packets.state.channel_id) return interaction.reply("I'm already in your voice channel")
            if (interaction.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return join()
            return interaction.reply("I'm already in a voice channel")
        }

        join()
        async function join() {
            if (!channel.joinable) return interaction.reply('I cannot join your voice channel');

            voice.joinVoiceChannel({
                channelId: channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            interaction.reply(`🔗 Successfully joined <#${channel.id}>`);
        }
    },
};
