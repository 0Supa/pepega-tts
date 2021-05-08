module.exports = {
  polly: function (phrase, voice) {
    return `https://api.streamelements.com/kappa/v2/speech?voice=${encodeURIComponent(voice)}&text=${encodeURIComponent(phrase)}`
  },
  google: function (phrase, lang, speed) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=${encodeURIComponent(lang)}&total=1&idx=0&textlen=${phrase.length}&client=tw-ob&prev=input&ttsspeed=${encodeURIComponent(speed)}`
  }
};