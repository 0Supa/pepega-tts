const { Permissions } = require('discord.js');
const utils = require('../utils/utils.js')
const characterLimit = 15

module.exports = {
    name: 'prefix',
    description: "changes the bot guild's prefix",
    cooldown: 7,
    aliases: ['pepegaprefix'],
    async execute(client, message) {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply('You need to have the `Manage Server` permission to use this command')
        if (!message.args.length) return message.reply('You need to specify a prefix')

        const prefix = message.args[0].toLowerCase()
        if (prefix.length > 15) return message.reply(`Your prefix is too long. The maximum is ${characterLimit} characters, you'll need to remove ${characterLimit - phrase.length} characters`)
        if (message.query.prefix === prefix) return message.reply(`The server prefix is already set to \`${prefix}\``)

        await utils.query(`UPDATE guilds SET prefix=? WHERE guild_id=?`, [prefix, message.guild.id])
        await utils.redis.del(`pt:guild:${message.guild.id}`)

        message.reply(`The server prefix has been successfully updated to \`${prefix}\``)
    },
};