const utils = require('../utils/utils.js')
const { MessageEmbed } = require("discord.js");
const { embed } = require('../utils/constants.js')

module.exports = {
    name: 'langs',
    description: "DM's you the Google TTS supported languages",
    aliases: ['languages'],
    cooldown: 8,
    async execute(client, message) {
        const data = await utils.query(`SELECT code, language, flag FROM languages`)
        const desc = data.map(x => `${x.flag} ${x.language} - **${message.query.prefix}lang ${x.code}**`)

        const emb = new MessageEmbed()
            .setTitle("List of available Google TTS languages")
            .setColor(embed.color)
            .setThumbnail('https://cdn.frankerfacez.com/emoticon/312720/2')
            .setDescription(desc.join('\n'))

        message.author.send({ embeds: [emb] })
            .catch((e) => {
                if (e == "DiscordAPIError: Cannot send messages to this user") {
                    message.reply("You have to allow direct messages from server members in order to DM you the TTS language list")
                } else {
                    throw e;
                }
            });
        message.react('📩')
    },
};