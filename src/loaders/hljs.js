const hljs = require('highlight.js');
const config = require('./config');

function highlight(str, lang) {
  if (lang && !hljs.getLanguage(lang)) {
    if (config.lang.indexOf(lang) > -1) {
      return `<pre data-react-lang="${lang}" data-react-children="${str}" style="display: none;"></pre>`;
    }
  }
  return ''; // use external default escaping
}

module.exports = highlight;
