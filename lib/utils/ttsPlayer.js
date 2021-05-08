class tts {
  constructor(guild) {
    this.guild = guild;
    this.queue = [];
  }

  google(phrase, lang) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=${encodeURIComponent(lang)}&total=1&idx=0&textlen=${phrase.length}&client=tw-ob&prev=input`

    this.queue.push(url);

    if (!this.guild.voice.connection.speaking.bitfield) this.playNext();
  }

  polly(phrase, voice) {
    const url = `https://api.streamelements.com/kappa/v2/speech?voice=${encodeURIComponent(voice)}&text=${encodeURIComponent(phrase)}`

    this.queue.push(url);

    if (!this.guild.voice.connection.speaking.bitfield) this.playNext();
  }

  playNext() {
    const [url] = this.queue;
    if (!url) return;

    this.play(url)
  }

  play(url) {
    const { connection } = this.guild.voice;
    const dispatcher = connection.play(url);

    dispatcher.on('finish', () => {
      this.queue.shift();
      this.playNext();
    });

    dispatcher.on('error', (error) => {
      this.queue.shift();
      this.playNext();
      console.error(error);
    });
  }
}

module.exports = tts;