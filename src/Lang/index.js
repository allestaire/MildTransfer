const LocalizedStrings = require('localized-strings/lib/LocalizedStrings').default

const strings = new LocalizedStrings({
  en: require('./en')
})

module.exports = strings
