let queue = []
const ttsEngine = require('./tts.js')

module.exports = {
    add: function (phrase, voice, engine) {
        queue.push({ phrase, voice, engine })
    },
    getUrl: async function () {
        if (!queue.length) return null;
        const tts = queue.shift()
        let ttsURL;

        switch (tts.engine) {
            case "polly": ttsURL = await ttsEngine.polly(phrase, voice); break;
            case "google": ttsURL = ttsEngine.google(phrase, voice); break;
        }

        return ttsURL;
    }
};