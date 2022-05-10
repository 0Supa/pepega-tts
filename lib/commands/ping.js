const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong! 🏓'),
    execute(interaction) {
        interaction.reply(`Pong! 🏓`)
    },
};
