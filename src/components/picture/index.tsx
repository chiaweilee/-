import React from 'react';

function ext(filename: string) {
  if (typeof filename !== 'string') return;
  return filename.replace(/.(jpe?g|png)$/i, '.webp');
}

interface PictureProps {
  src: string;
  alt?: string;
  onClick?: () => void;
  [prop: string]: any;
}

export default function (props: PictureProps) {
  return (
    <picture onClick={props.onClick}>
      <source type="image/webp" {...{ srcset: ext(props.src) }} />
      <img src={props.src} alt={props.alt} />
    </picture>
  );
}
