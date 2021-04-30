module.exports = {
    name: 'ping',
    description: 'pong! 🏓',
    aliases: ['pong', 'pyng', 'dink'],
    cooldown: 3,
    execute(message, args) {
        message.reply(`pong! 🏓 \`${Date.now() - message.createdTimestamp}ms\``)
    },
};