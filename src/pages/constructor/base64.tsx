import React, { useState } from 'react';
import { Button, WhiteSpace, InputItem } from 'antd-mobile';
import { Encoder } from '@/components/cryptor';
import styles from './base64.less';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function () {
  const [img, setImg] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.uploader}>
      <input
        type="file"
        accept={'image/*'}
        disabled={loading}
        onChange={async (e: any) => {
          setLoading(true);
          const file = e.target.files[0];
          const base64 = await getBase64(file);
          setImg(base64);
          setName(file.name);
          setLoading(false);
        }}
      />
      {img && (
        <div>
          <WhiteSpace />
          <img src={img} width="100%" alt="" />
          <WhiteSpace />
          <Encoder img name={name} text={img} />
        </div>
      )}
    </div>
  );
}
