import React, { useState } from 'react';
import { WhiteSpace, TextareaItem } from 'antd-mobile';
import { Typography } from 'antd';
import googleMapUrlParser from '@/utils/googleMapUrlParser';

const { Text, Paragraph } = Typography;

function onChange(setter: (e: any) => void) {
  return function (value) {
    setter(value);
  };
}

export default function () {
  const [text, setText] = useState('');
  const [place, lnglat] = googleMapUrlParser(text);
  const code = '```bing-map\n' + [lnglat, place].filter((_) => _).join(',') + '\n```';
  return (
    <div>
      <TextareaItem rows={4} count={9999} onChange={onChange(setText)} />
      <WhiteSpace />
      <Paragraph
        copyable={{
          text: code,
        }}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        <Text code>{code}</Text>
      </Paragraph>
      <WhiteSpace />
    </div>
  );
}
