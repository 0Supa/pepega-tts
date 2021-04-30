const { MessageEmbed } = require("discord.js");
const { embed } = require('../utils/constants.js')

module.exports = {
    name: 'voices',
    description: "DM's you the Polly TTS supported voices",
    cooldown: 8,
    async execute(message, utils) {
        const data = await utils.query(`SELECT language, voice, flag FROM voices`)
        const desc = data.map(x => `${x.flag} ${x.language} - **${message.query.prefix}voice ${x.voice}**`)

        const emb = new MessageEmbed()
            .setTitle("List of available Polly TTS voices")
            .setColor(embed.color)
            .setThumbnail('https://cdn.frankerfacez.com/emoticon/312720/2')
            .setDescription(desc)

        message.author.send({ embed: emb })
            .catch((e) => {
                if (e == "DiscordAPIError: Cannot send messages to this user") {
                    message.reply("you have to allow direct messages from server members in order to DM you the TTS voice list")
                } else {
                    throw e;
                }
            });
        message.react('📩')
    },
};