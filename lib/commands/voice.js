const utils = require('../utils/utils.js')

module.exports = {
    name: 'voice',
    description: 'changes the guild Polly TTS voice',
    cooldown: 5,
    async execute(client, message) {
        if (!message.args.length) {
            const data = (await utils.query(`SELECT language, flag FROM voices WHERE voice=?`, [message.query.voice]))[0]
            message.reply(`You need to specify a voice\nThe current voice is set to: **${message.query.voice}** (${data.flag} ${data.language})\nUse **${message.query.prefix}voices** for the supported voices list`)
            return
        }

        const newVoice = message.args[0]

        const data = await utils.query(`SELECT * FROM voices WHERE voice=?`, [newVoice])
        if (!data.length) return message.reply(`The TTS voice you supplied is not valid\nUse **${message.query.prefix}voices** for the supported voices list`)
        if (message.query.voice === data[0].voice) return message.reply(`The TTS voice is already set to: **${data[0].voice}** | ${data[0].flag} ${data[0].language}`)

        await utils.query(`UPDATE guilds SET voice=? WHERE guild_id=?`, [data[0].voice, message.guild.id])
        await utils.redis.del(`pt:guild:${message.guild.id}`)

        message.reply(`The Polly TTS voice has been successfully updated to: **${data[0].voice}** | ${data[0].flag} ${data[0].language}`)
    },
};