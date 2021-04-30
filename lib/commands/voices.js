const { MessageEmbed } = require("discord.js");
const { embed } = require('../utils/constants.js')

module.exports = {
    name: 'voices',
    description: "DM's you the Polly TTS supported voices",
    cooldown: 8,
    async execute(message, utils) {
        const data = await utils.query(`SELECT language, voice, flag FROM voices`)

        const emb = new MessageEmbed()
            .setTitle("List of available Google TTS languages")
            .setColor(embed.color)
            .setThumbnail('https://cdn.frankerfacez.com/emoticon/312720/2')

        const desc = data.map(x => `${x.flag} ${x.language} - **${message.query.prefix}voice ${x.voice}**`).join('\n')
        const len = 2045;
        const curr = len;
        const prev = 0;

        output = [];

        while (desc[curr]) {
            if (desc[curr++] === ' ') {
                output.push(desc.substring(prev, curr));
                prev = curr;
                curr += len;
            }
        }
        output.push(desc.substr(prev));

        for (const splitted of desc) {
            emb.addField(`\u200b`, splitted)
        }

        message.author.send({ embed: emb })
            .catch((e) => {
                if (e == "DiscordAPIError: Cannot send messages to this user") {
                    message.reply("you have to allow direct messages from server members in order to DM you the TTS language list")
                } else {
                    throw e;
                }
            });
        message.react('📩')
    },
};