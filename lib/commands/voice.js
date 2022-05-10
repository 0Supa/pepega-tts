const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../utils/utils.js')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Changes the guild Polly TTS voice')
        .addStringOption(option =>
            option.setName('voice')
                .setDescription('The Polly TTS voice that you want to set, use "/voices" for a list')
                .setRequired(true)),
    async execute(interaction) {
        const newVoice = interaction.options.getString('voice');

        const data = await utils.query(`SELECT * FROM voices WHERE voice=?`, [newVoice])
        if (!data.length) return interaction.reply(`The TTS voice you supplied is not valid\nUse **/voices** for the supported voices list`)
        if (interaction.query.voice === data[0].voice) return interaction.reply(`The TTS voice is already set to: **${data[0].voice}** | ${data[0].flag} ${data[0].language}`)

        await utils.query(`UPDATE guilds SET voice=? WHERE guild_id=?`, [data[0].voice, interaction.guild.id])
        await utils.redis.del(`pt:guild:${interaction.guild.id}`)

        interaction.reply(`The Polly TTS voice has been successfully updated to: **${data[0].voice}** | ${data[0].flag} ${data[0].language}`)
    },
};