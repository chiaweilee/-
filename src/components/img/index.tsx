import React, { useEffect } from 'react';
import useModal from '@/utils/useModal';
import { getPropsFromChildren, getPropsFromInline } from '@/components/helper';
import Modal from '@/components/modal';
import Picture from '@/components/picture';

let modalDestroyer;

export default function ({ children }) {
  const [filename, propsInline] = getPropsFromChildren(children);
  const { origin } = getPropsFromInline(propsInline);
  const src =
    process.env.NODE_ENV === 'development' ? `../assets/${filename}` : `/home/assets/${filename}`;
  useEffect(() => {
    return () => {
      if (typeof modalDestroyer === 'function') {
        modalDestroyer();
      }
    };
  }, []);

  return (
    <Picture
      src={src}
      alt=""
      onClick={() => {
        modalDestroyer = useModal(
          <Modal>
            <Picture src={src} width="100%" />
          </Modal>,
        );
      }}
    />
  );
}
