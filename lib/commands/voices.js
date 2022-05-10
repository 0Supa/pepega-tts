const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    cooldown: 8,
    data: new SlashCommandBuilder()
        .setName('voices')
        .setDescription('Sends a link to the Polly TTS supported voices'),
    execute(interaction) {
        interaction.reply(`<https://docs.aws.amazon.com/polly/latest/dg/voicelist.html>\nSet a voice by using: **/voice {Name}**\nExample: __/voice Brian__`)
    },
};
