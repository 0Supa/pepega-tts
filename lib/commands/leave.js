const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const voice = require('@discordjs/voice');

module.exports = {
    cooldown: 4,
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the current voice channel'),
    execute(interaction) {
        const channel = interaction.member.voice.channel;
        const connection = voice.getVoiceConnection(interaction.guild.id);

        if (!interaction.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return interaction.reply('You need to have the `Move Members` permission to use this command')
        if (!channel) return interaction.reply('You need to be in a voice channel to do this');
        if (!connection) return interaction.reply("I'm not in a voice channel");

        const channelId = connection.packets.state.channel_id

        if (channel.id !== channelId) return interaction.reply('You need to be in the same voice channel as me')

        connection.destroy()
        interaction.reply(`🍃 Successfully left <#${channelId}>`)
    },
};
