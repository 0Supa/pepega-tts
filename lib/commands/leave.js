const { SlashCommandBuilder } = require('@discordjs/builders');
const voice = require('@discordjs/voice');

module.exports = {
    cooldown: 4,
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the current voice channel'),
    execute(interaction) {
        const channel = interaction.member.voice.channel;
        const connection = voice.getVoiceConnection(interaction.guild.id);

        if (!channel) return interaction.reply('You need to be in a voice channel to do this');
        if (!connection) return interaction.reply("I'm not in a voice channel");

        const channelId = connection.packets.state.channel_id

        if (channel.id !== channelId) return interaction.reply('You need to be in the same voice channel as me')

        connection.destroy()
        interaction.reply(`🍃 Successfully left <#${channelId}>`)
    },
};
