const languages = require('../../data/languages.json')

module.exports = {
    name: 'lang',
    description: 'changes the guild Google TTS language',
    cooldown: 5,
    async execute(message, utils) {
        if (!message.args.length) return message.reply(`you need to specify a language\nThe current language is set to: \`${languages[message.query.lang]}\``)
        const ppLang = message.args[0].toLowerCase()
        const lang = languages[ppLang]
        if (!lang) return message.reply(`the TTS language you supplied is not valid`)
        if (message.query.lang === ppLang) return message.reply(`the TTS language is already set to \`${lang}\``)

        await utils.query(`UPDATE guilds SET lang=? WHERE guild_id=?`, [ppLang, message.guild.id])
        utils.cache.del(message.guild.id)

        message.reply(`the Google TTS language has been successfully updated to \`${lang}\``)
    },
};