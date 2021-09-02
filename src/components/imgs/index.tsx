import React from 'react';
import Img from '@/components/img';
import { Grid } from 'antd-mobile';

export default function ({ items, col = 3 }) {
  return (
    <Grid
      data={items}
      columnNum={col}
      renderItem={(props) => {
        if (typeof props === 'string') {
          return (
            <div
              style={{
                backgroundImage: `url(${
                  process.env.NODE_ENV === 'development'
                    ? `../assets/${props}`
                    : `/home/assets/${props}`
                })`,
              }}
            >
              <Img src={props} alt="" />
            </div>
          );
        }
        return (
          <div
            style={{
              backgroundImage: `url(${
                process.env.NODE_ENV === 'development'
                  ? `../assets/${props.src}`
                  : `/home/assets/${props.src}`
              })`,
            }}
          >
            <Img {...props} src={props.src} alt={props.alt} />
          </div>
        );
      }}
    />
  );
}
