const truncate = require('./truncateText.js')
const voice = require('@discordjs/voice');

const guilds = new Map();

const addToQueue = (guild, url) => {
    guild.queue.push(url);

    if (!guild.playing) playNext(guild);
}

const playNext = (guild) => {
    const [url] = guild.queue;
    if (!url) return;

    play(guild, url)
}

const play = (guild, url) => {
    guild.player = voice.createAudioPlayer();
    const resource = voice.createAudioResource(url);

    const connection = voice.getVoiceConnection(guild.id);

    guild.playing = true
    guild.player.play(resource);
    connection.subscribe(guild.player);

    const continueQueue = () => {
        guild.playing = false
        guild.queue.shift();
        playNext(guild);
    }

    guild.player.on(voice.AudioPlayerStatus.Idle, continueQueue);
    guild.player.on('error', continueQueue);
}

module.exports = {
    init: (guildId) => {
        if (guilds.has(guildId)) return

        guilds.set(guildId, {
            id: guildId,
            playing: false,
            queue: [],
            player: null
        })
    },

    resetGuild: (guildId) => {
        const guild = guilds.get(guildId)
        if (!guild) return

        guild.playing = false
        guild.queue = []
        guild.player = null
    },

    createVoiceConnection: (options) => {
        const connection = voice.joinVoiceChannel(options);

        connection.on(voice.VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    voice.entersState(connection, voice.VoiceConnectionStatus.Signalling, 5_000),
                    voice.entersState(connection, voice.VoiceConnectionStatus.Connecting, 5_000)
                ]);
            } catch (error) {
                connection.destroy();
            }
        });
    },

    skip: (guildId) => {
        const guild = guilds.get(guildId)

        if (!guild.playing) return

        guild.queue.shift()
        guild.player.stop()
        playNext(guild);
        return true
    },

    stop: (guildId) => {
        const guild = guilds.get(guildId)

        if (!guild.playing) return

        guild.queue = []
        guild.player.stop()
        return true
    },

    google: (guildId, phrase, lang) => {
        const guild = guilds.get(guildId)

        if (phrase.length > 200) {
            const phrases = truncate.whole(phrase, 200)
            for (let i = 0, len = phrases.length; i < len; i++) {
                const phrase = phrases[i]
                const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=${encodeURIComponent(lang)}&total=1&idx=0&textlen=${phrase.length}&client=tw-ob&prev=input`
                addToQueue(guild, url);
            }
        } else {
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=${encodeURIComponent(lang)}&total=1&idx=0&textlen=${phrase.length}&client=tw-ob&prev=input`
            addToQueue(guild, url);
        }
    },

    polly: (guildId, phrase, voice) => {
        const guild = guilds.get(guildId)

        const url = `https://api.streamelements.com/kappa/v2/speech?voice=${encodeURIComponent(voice)}&text=${encodeURIComponent(phrase)}`
        addToQueue(guild, url)
    }
}
