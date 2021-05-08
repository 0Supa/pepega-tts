module.exports = {
    name: 'leave',
    description: 'leaves the current voice channel',
    aliases: ['disconnect'],
    cooldown: 3,
    execute(message, args) {
        const connection = message.guild.voice.connection ?? null;
        const { channel } = message.member.voice

        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply('you need to have `Move Members` permission to use this command')

        if (!channel) return message.reply('you need to be in a voice channel to do that.');

        if (!connection) return message.reply("I'm not in a voice channel.");

        if (channel.id !== connection.channel.id) return message.reply('you need to be in the same voice channel as me.')

        if (message.member.voice.serverDeaf || message.member.voice.selfDeaf || message.member.voice.serverMute) return message.reply('you are muted/deafened.')

        channel.leave()
        message.react("🍃")
    },
};