const utils = require('../utils/utils.js')

module.exports = {
    name: 'lang',
    description: 'changes the guild Google TTS language',
    cooldown: 5,
    async execute(client, message) {
        if (!message.args.length) {
            const data = (await utils.query(`SELECT language, flag FROM languages WHERE code=?`, [message.query.lang]))[0]
            message.reply(`You need to specify a language\nThe current language is set to: **${data.flag} ${data.language}**\nUse **${message.query.prefix}langs** for the supported languages list`)
            return
        }

        const data = await utils.query(`SELECT * FROM languages WHERE code=? OR language=?`, [message.args[0], message.args[0]])
        if (!data.length) return message.reply(`The TTS language you supplied is not valid\nUse **${message.query.prefix}langs** for the supported languages list`)
        if (message.query.lang === data[0].code) return message.reply(`The TTS language is already set to: **${data[0].flag} ${data[0].language}**`)

        await utils.query(`UPDATE guilds SET lang=? WHERE guild_id=?`, [data[0].code, message.guild.id])
        await utils.redis.del(`pt:guild:${message.guild.id}`)

        message.reply(`The Google TTS language has been successfully updated to: **${data[0].flag} ${data[0].language}**`)
    },
};