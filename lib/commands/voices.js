module.exports = {
    name: 'voices',
    description: "sends the Polly TTS supported voices",
    cooldown: 8,
    async execute(message, utils) {
        message.reply(`<https://docs.aws.amazon.com/polly/latest/dg/voicelist.html>\n**${message.query.prefix}voice {Name}**\nExample: **${message.query.prefix}voice Brian**`)
    },
};