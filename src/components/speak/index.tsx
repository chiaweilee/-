import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import Icon from '@/components/icon';
import { request } from '@/components/dict/api';
import styles from './index.less';

function play(src: string, onplay: () => void) {
  const player = document.createElement('audio');
  const source = document.createElement('source');
  source.src = src;
  player.appendChild(source);
  player.autoplay = true;
  player.onplay = onplay;
  player.onended = function () {
    document.body.removeChild(player);
  };
  document.body.appendChild(player);
}

export default (props: any) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(undefined);
  if (typeof props.children !== 'string' || !props.children) {
    return null;
  }

  function say(word) {
    function getCache() {
      const keygen = `dict_cache_${word}`;
      const cache = localStorage.getItem(keygen);
      if (cache) {
        return Promise.resolve(JSON.parse(cache));
      } else {
        return request(props.children, props.lang)
          .then((response) => {
            // https://github.com/meetDeveloper/googleDictionaryAPI/issues/82
            if (Array.isArray(response) && response.length) {
              const matchedResult = response.filter((res) => res.word === word);
              if (matchedResult.length) {
                return Promise.resolve(matchedResult);
              }
            }
            return Promise.reject();
          })
          .then((response) => {
            localStorage.setItem(keygen, JSON.stringify(response));
            return response;
          });
      }
    }
    return function () {
      setLoading(true);
      getCache()
        .then((dict) => {
          if (Array.isArray(dict) && dict.length) {
            const { phonetics } = dict[0];
            if (Array.isArray(phonetics) && phonetics.length) {
              const { audio, text: t } = phonetics[0];
              if (typeof t === 'string' && t) {
                setText(t);
              }
              if (audio) {
                play(audio, function () {
                  setLoading(false);
                });
              } else {
                setLoading(false);
              }
              return Promise.resolve();
            }
          }
          return Promise.reject();
        })
        .catch(() => {
          setLoading(false);
        });
    };
  }

  const words = props.children.split(' ');
  return words.map((word) => (
    <span key={word} className={styles.clear}>
      <Button
        type="ghost"
        icon={<Icon type={'iconvoicelight'} />}
        inline
        size="small"
        onClick={say(word)}
        loading={loading}
      >
        {word}
        <b>{text}</b>
      </Button>
    </span>
  ));
};
