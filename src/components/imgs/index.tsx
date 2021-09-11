import React from 'react';
import Img from '@/components/img';
import { Grid } from 'antd-mobile';
import { getPropsFromChildren, getPropsFromInline } from '@/components/helper';

export default function ({ children }) {
  const [items, propsInline] = getPropsFromChildren(children);
  const data: any[] = typeof items === 'string' ? items.split(',') : [];
  const { col } = getPropsFromInline(propsInline);
  return (
    <Grid
      data={data}
      columnNum={col}
      renderItem={(src: any) => {
        if (typeof src === 'string') {
          return (
            <div
              style={{
                backgroundImage: `url(${
                  process.env.NODE_ENV === 'development'
                    ? `../assets/${src}`
                    : `/home/assets/${src}`
                })`,
              }}
            >
              <Img>{src}</Img>
            </div>
          );
        }
      }}
    />
  );
}
