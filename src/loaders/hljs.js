const config = require('./config');

function highlight(str, lang) {
  if (config.lang.indexOf(lang) > -1) {
    return `<pre data-react-lang="${lang}" data-react-children="${str}" style="display: none;"></pre>`;
  }
  return ''; // use external default escaping
}

module.exports = highlight;
