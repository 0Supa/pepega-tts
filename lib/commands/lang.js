const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../utils/utils.js')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('lang')
        .setDescription('Changes the guild Google TTS language')
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The Google TTS language that you want to set, use "/langs" for a list')
                .setRequired(true)),
    async execute(interaction) {
        const newLang = interaction.options.getString('language');

        const data = await utils.query(`SELECT * FROM languages WHERE code=? OR language=?`, [newLang, newLang])
        if (!data.length) return interaction.reply(`The TTS language you supplied is not valid\nUse **/langs** for the supported languages list`)
        if (interaction.query.lang === data[0].code) return interaction.reply(`The TTS language is already set to: **${data[0].flag} ${data[0].language}**`)

        await utils.query(`UPDATE guilds SET lang=? WHERE guild_id=?`, [data[0].code, interaction.guild.id])
        await utils.redis.del(`pt:guild:${interaction.guild.id}`)

        interaction.reply(`The Google TTS language has been successfully updated to: **${data[0].flag} ${data[0].language}**`)

    },
};
