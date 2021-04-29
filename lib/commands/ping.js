module.exports = {
    name: 'ping',
    description: 'pong! 🏓',
    aliases: ['pong', 'pyng', 'dink'],
    cooldown: 3,
    execute(message, args) {
        message.reply(`pong! 🏓 \`WS: ${message.client.ws.ping}ms\``)
    },
};