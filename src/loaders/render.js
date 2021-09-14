module.exports = (rawHtml) => `import React from 'react';
import ReactDOM from 'react-dom';
import processor from '@/components/processor';
export default function(props) {
  // scroll to anchor after page component loaded
    React.useEffect(() => {
      const targets = document.querySelectorAll('pre[data-react-lang]');
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        const lang = target.getAttribute('data-react-lang');
        const children = target.getAttribute('data-react-children');
        const div = document.createElement('div');
        div['data-react-mounted'] = '';
        target.parentNode.insertBefore(div, target);
        target.remove();
        ReactDOM.render(processor(lang, children), div);
      }
      return () => {
        const targets = document.querySelectorAll('div[data-react-mounted]');
        for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        ReactDOM.unmountComponentAtNode(target);
      }
      }
    }, []);
  return (${rawHtml});
}`;
