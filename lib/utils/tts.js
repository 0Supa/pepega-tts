const got = require('got');

module.exports = {
  polly: function (phrase, voice) {
    return new Promise(async (resolve, reject) => {
      const retryCount = 3
      const { body } = await got.post('https://streamlabs.com/polly/speak', {
        retryCount,
        json: {
          voice,
          text: phrase
        }
      })

      const json = JSON.parse(body)

      resolve(json.speak_url)
    });
  },
  google: function (phrase, lang, speed) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=${encodeURIComponent(lang)}&total=1&idx=0&textlen=${phrase.length}&client=tw-ob&prev=input&ttsspeed=${encodeURIComponent(speed)}`
  }
};