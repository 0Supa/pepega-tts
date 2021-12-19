module.exports = {
    name: 'ping',
    description: 'pong! 🏓',
    aliases: ['pong', 'pyng', 'dink'],
    cooldown: 3,
    execute(client, message) {
        const rtt = Date.now() - message.createdTimestamp
        message.reply(`Pong! 🏓 \`RTT: ~${rtt}ms\` \`WS: ${message.client.ws.ping}ms\``)
    },
}
