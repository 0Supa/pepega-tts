module.exports = {
    name: 'help',
    description: "DM's you the command list",
    aliases: ['commands', 'cmds'],
    cooldown: 8,
    execute(message, args) {
        const knownCommands = ['help', 'ping', 'prefix', 'join', 'polly', 'say', 'voice', 'lang']
        for (let i = 0, len = knownCommands.length; i < len; i++) {
            const command = message.client.commands.get(knownCommands[i])
            console.log(command)
        }
    },
};