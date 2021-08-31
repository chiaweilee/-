import React, { useEffect } from 'react';
import Icon from '@/components/icon';
import styles from './index.less';

export default function (props: any) {
  const { children, __unmount__ } = props;

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
        {children}
      </div>
    </div>
  );
}
