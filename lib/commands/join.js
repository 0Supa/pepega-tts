module.exports = {
    name: 'join',
    description: 'joins your voice channel',
    aliases: ['connect'],
    cooldown: 4,
    execute(message) {
        const { channel } = message.member.voice;
        const connection = message.guild.voice.connection ?? null;

        if (!channel) return message.reply('you need to be in a voice channel first');

        if (connection) {
            if (message.member.hasPermission("MANAGE_GUILD")) return join()
            return message.reply("I'm already in a voice channel")
        }

        join()
        async function join() {
            if (connection && channel.id === connection.channel.id) return message.reply("I'm already in your voice channel")
            if (!channel.joinable) return message.reply('I cannot join your voice channel');
            await channel.join()
            message.react('✅');
        }
    }
}