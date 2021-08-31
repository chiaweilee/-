import React, { useEffect } from 'react';
import usePanZoom from 'use-pan-zoom';
import Icon from '@/components/icon';
import styles from './index.less';

export default function (props: any) {
  const { elemRef, style } = usePanZoom({
    minScale: 1,
    bounds: { x: [-Infinity, Infinity], y: [-Infinity, Infinity] },
  });
  const { children, __unmount__, fullscreen } = props;

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.height = '100%';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    return () => {
      document.getElementsByTagName('body')[0].style.height = '';
      document.getElementsByTagName('body')[0].style.overflow = '';
    };
  }, []);

  return (
    <div>
      <div className={styles['modal-mask']} />
      <div className={styles['modal-wrap']}>
        <div className={styles['modal-close']}>
          <Icon type={'iconclose'} onClick={__unmount__} />
        </div>
        <div
          ref={elemRef}
          style={{
            ...(fullscreen ? { width: '100%', height: '100%' } : {}),
            touchAction: 'none',
            transformOrigin: '0 0',
            transform: `translate3d(${style.x}px, ${style.y}px, 0) scale(${style.scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
