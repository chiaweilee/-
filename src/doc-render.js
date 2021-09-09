const splitter = 'S^P^L^I^T^T^E^R';

module.exports = (rawHtml) => `import React from 'react';
  export default function() {
    return (${blockLoader(rawHtml)});
  }`;

function blockLoader(rawHtml) {
  const block = ['<section>'];
  // start
  const body = getContent(rawHtml, 'body');
  body.forEach((b, i) => {
    if (i % 2 === 1) {
      block.push(getCode(b));
    } else {
      block.push('<div dangerouslySetInnerHTML={{ __html: `' + b + '` }} />');
    }
  });
  // end
  block.push('</section>');
  return block.join('');
}

// todo refactor with cheerio
function getContent(rawHtml, tagName) {
  const reg = new RegExp(`<${tagName}[^>]*>([\\s\\S]+?)</${tagName}>`);
  const content = reg.exec(rawHtml);
  if (content && content[1]) {
    return content[1]
      .replace(/<pre><code/g, splitter + '<pre><code')
      .replace(/<\/pre><\/code>/g, '</pre></code>' + splitter)
      .split(splitter);
  }
  return [];
}

function getCode(rawHtml) {
  const reg = new RegExp(`<pre><code class="language-([^"]*)[^>]*>([\\s\\S]+?)</code></pre>`);
  const matcher = reg.exec(rawHtml);
  if (matcher) {
    const [, lang, rawContent] = matcher;
    const content = rawContent.split('\n');
    return blockRender(content, lang, rawHtml);
  }
  return rawHtml;
}

function blockRender(content, lang, rawHtml) {
  switch (lang) {
    case 'hotel-nights':
    default:
      return '<div dangerouslySetInnerHTML={{ __html: `' + rawHtml + '` }} />';
  }
}
