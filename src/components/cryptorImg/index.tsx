import React, { useState, useEffect } from 'react';
import { decoder, secretKey } from '@/components/cryptor';
import { onTouch } from '@/utils/e';
import { getPropsFromChildren, getPropsFromInline } from '@/components/helper';

export default function ({ children }) {
  const [hidden, setHidden] = useState(true);
  const [img, setImg] = useState(undefined);
  const [src, propsInline] = getPropsFromChildren(children);
  const { strict, autoload } = getPropsFromInline(propsInline);
  const secret = localStorage.getItem(secretKey);

  async function load() {
    const res = await (
      await fetch(
        process.env.NODE_ENV === 'development'
          ? `../assets/${src}.json`
          : `/home/assets/${src}.json`,
      )
    ).json();
    if (res) {
      setImg(decoder(res));
    }
  }

  useEffect(() => {
    if (secret && autoload) {
      setHidden(false);
    }
  }, []);

  useEffect(() => {
    if (secret && !hidden) {
      load();
    }
  }, [src, hidden]);

  if (!localStorage.getItem(secretKey)) {
    return null;
  }

  if (hidden) {
    return (
      <img
        {...onTouch({
          longTouchTimeout: strict ? 30000 : 3000,
          onLongPress: () => {
            setHidden(false);
          },
        })}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        alt=""
        style={{ height: '33vw' }}
      />
    );
  }
  return <img src={img} alt="" />;
}
