const utils = require('../utils/utils.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { embed } = require('../utils/constants.js')

module.exports = {
    cooldown: 8,
    data: new SlashCommandBuilder()
        .setName('langs')
        .setDescription("DM's you the Google TTS supported languages"),
    async execute(interaction) {
        const data = await utils.query(`SELECT code, language, flag FROM languages`)
        const desc = data.map(x => `${x.flag} ${x.language} - **/lang ${x.code}**`)

        const emb = new MessageEmbed()
            .setTitle("List of available Google TTS languages")
            .setColor(embed.color)
            .setThumbnail('https://cdn.frankerfacez.com/emoticon/312720/2')
            .setDescription(desc.join('\n'))

        interaction.user.send({ embeds: [emb] })
            .catch((e) => {
                if (e == "DiscordAPIError: Cannot send messages to this user") {
                    interaction.reply("You have to allow direct messages from server members in order to DM you the TTS language list")
                } else {
                    throw e;
                }
            });

        interaction.reply({
            content: "Check your DMs!",
            ephemeral: true
        })
    },
};
