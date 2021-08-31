import React, { useState, useEffect } from 'react';
import Img from '../img/';
import { decoder, secretKey } from '@/components/cryptor';
import { onTouch } from '@/utils/e';

export default function (props) {
  const [hidden, setHidden] = useState(true);
  const [img, setImg] = useState(undefined);
  const { src, strict, alt, autoload } = props;

  useEffect(() => {
    (async () => {
      if (localStorage.getItem(secretKey) && (autoload || !hidden)) {
        const res = await (
          await fetch(
            process.env.NODE_ENV === 'development'
              ? `../assets/${src}.json`
              : `/home/assets/${src}.json`,
          )
        ).json();
        if (res) {
          setImg(decoder(res));
          setHidden(false);
        }
      }
    })();
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
        alt={alt}
        style={{ height: '33vw' }}
      />
    );
  }

  return <Img origin={true} src={img} alt={alt} />;
}
