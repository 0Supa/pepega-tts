const validVoices = require('../../data/voices.json')

module.exports = {
    name: 'voice',
    description: 'changes the guild Polly TTS voice',
    cooldown: 5,
    async execute(message, utils) {
        if (!message.args.length) return message.reply(`you need to specify a voice\nThe current voice is set to \`${message.query.voice}\``)
        const voice = cap(message.args[0].toLowerCase())
        if (!validVoices.includes(voice)) return message.reply(`the TTS voice you supplied is not valid`)
        if (message.query.voice === voice) return message.reply(`the TTS voice is already set to \`${voice}\``)

        await utils.query(`UPDATE guilds SET voice=? WHERE guild_id=?`, [voice, message.guild.id])

        message.reply(`the Polly TTS voice has been successfully updated to \`${voice}\``)

        function cap(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
};