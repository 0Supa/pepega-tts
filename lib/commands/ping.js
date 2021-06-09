module.exports = {
    name: 'ping',
    description: 'pong! 🏓',
    aliases: ['pong', 'pyng', 'dink'],
    cooldown: 3,
    execute(message, args) {
        const RTT = Date.now() - message.createdTimestamp
        message.reply(`pong! 🏓 \`RTT: ~${RTT}ms\` \`WS: ${message.client.ws.ping}ms\``)
    },
};