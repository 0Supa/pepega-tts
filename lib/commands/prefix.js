const characterLimit = 15

module.exports = {
    name: 'prefix',
    description: "changes the bot guild's prefix",
    cooldown: 7,
    aliases: ['pepegaprefix'],
    async execute(message, utils) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply('you need to have `Manage Server` permission to change the server prefix')
        if (!message.args.length) return message.reply('you need to specify a prefix')
        const prefix = message.args[0]
        if (prefix.length > 15) return message.reply(`your prefix is too long. The maximum is ${characterLimit} characters, you'll need to remove ${characterLimit - phrase.length} characters`)
        if (message.query.prefix === prefix) return message.reply(`the server prefix is already set to \`${prefix}\``)

        await utils.query(`UPDATE guilds SET prefix=? WHERE guild_id=?`, [prefix, message.guild.id])
        await utils.cache.del(message.guild.id)

        message.reply(`the server prefix was successfully updated to \`${prefix}\``)
    },
};