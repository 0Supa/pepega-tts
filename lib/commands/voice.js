module.exports = {
    name: 'voice',
    description: 'changes the guild Polly TTS voice',
    cooldown: 5,
    async execute(message, utils) {
        if (!message.args.length) {
            const data = (await utils.query(`SELECT language, flag FROM voices WHERE voice=?`, [message.query.voice]))[0]
            message.reply(`you need to specify a voice\nThe current voice is set to: **${message.query.voice}** (${data.flag} ${data.language})\nUse **${message.query.prefix}voices** for the supported voices list`)
            return
        }

        const data = await utils.query(`SELECT * FROM voices WHERE voice=?`, [message.args[0]])
        if (!data.length) return message.reply(`the TTS voice you supplied is not valid\nUse **${message.query.prefix}voices** for the supported voices list`)
        if (message.query.voice === data[0].voice) return message.reply(`the TTS voice is already set to: **${voice}** (${data[0].flag} ${data[0].language})`)

        await utils.query(`UPDATE guilds SET voice=? WHERE guild_id=?`, [voice, message.guild.id])
        utils.cache.del(message.guild.id)

        message.reply(`the Polly TTS voice has been successfully updated to \`${voice}\``)
    },
};