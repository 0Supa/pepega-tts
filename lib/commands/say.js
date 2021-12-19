module.exports = {
    name: 'say',
    aliases: ['s'],
    cooldown: 8,
    async execute(client, message) {
        message.reply(`This command name has been removed, please use \`${message.query.prefix}google\` or \`${message.query.prefix}g\` instead`)
    },
};