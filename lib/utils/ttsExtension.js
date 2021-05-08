const ttsPlayer = require('./tts.js');

const extension = (guild) => {
    return class ttsExtension extends guild {
        constructor(client, data) {
            super(client, data);
            this.ttsPlayer = new ttsPlayer(this);
        }
    };
};

module.exports = extension;