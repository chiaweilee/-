import React, { useEffect } from 'react';
import useModal from '@/utils/useModal';
import Modal from '@/components/modal';
import Picture from '@/components/picture';

let modalDestroyer;

export default function ({ children }) {
  const props = {
    src: process.env.NODE_ENV === 'development'
      ? `../assets/${children}`
      : `/home/assets/${children}`,
  };
  useEffect(() => {
    return () => {
      if (typeof modalDestroyer === 'function') {
        modalDestroyer();
      }
    };
  }, []);

  return (
    <Picture
      src={props.src}
      alt=""
      onClick={() => {
        modalDestroyer = useModal(
          <Modal>
            <Picture {...props} width="100%" />
          </Modal>,
        );
      }}
    />
  );
}
