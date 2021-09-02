import React, { useEffect } from 'react';
import useModal from '@/utils/useModal';
import Modal from '@/components/modal';
import Picture from '@/components/picture';

let modalDestroyer;

export default function ({ src, alt, origin = false }) {
  const props = {
    src: origin
      ? src
      : process.env.NODE_ENV === 'development'
      ? `../assets/${src}`
      : `/home/assets/${src}`,
    alt,
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
      alt={props.alt}
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
