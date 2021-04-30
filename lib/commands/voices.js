module.exports = {
    name: 'voices',
    description: "sends the Polly TTS supported voices",
    cooldown: 8,
    async execute(message, utils) {
        message.reply(`<https://docs.aws.amazon.com/polly/latest/dg/voicelist.html>\nSet a voice by using: **${message.query.prefix}voice {Name}**\nExample: __${message.query.prefix}voice Brian__`)
    },
};