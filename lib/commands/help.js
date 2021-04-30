module.exports = {
    name: 'help',
    description: "DM's you the command list",
    aliases: ['commands', 'cmds'],
    cooldown: 8,
    execute(message, args) {
        const knownCommands = ['help', 'ping', 'prefix', 'join', 'polly', 'say', 'voice', 'lang']
    },
};