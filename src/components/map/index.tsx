import React, { useEffect } from 'react';
import Map from './Map';
import Modal from '@/components/modal/pure';
import useModal from '@/utils/useModal';
import styles from './index.less';
import { getPropsFromChildren, getPropsFromInline, getListFromInline } from '@/components/helper';

const apiKey =
  process.env.NODE_ENV === 'development'
    ? 'AmaJse0LMtAHWktKP2ew2c_NNcKEDFem3a1MWEu8xN0_fNn-alxc7q1BlLEgcQtD'
    : 'AvHBgtLyf4zbDhXESAuvFMSqIg1GgomX6DnDgw-CaXFeRmWVzvXPC55WveE4pJla';

let modalDestroyer;

const MapComponent = ({ children }) => {
  const propsList = getPropsFromChildren(children);
  const nativeProps = Object.assign({}, ...propsList.map(getPropsFromInline));
  const props = {
    ...nativeProps,
    driving: getListFromInline(nativeProps.driving),
    points: getListFromInline(nativeProps.points),
    walking: getListFromInline(nativeProps.walking),
  };
  // @ts-ignore
  const [latitude, longitude] = typeof center === 'string' ? center.split(',') : [];
  const points = Array.isArray(props.points)
    ? props.points.map((point: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const [latitude, longitude] = point.split(',');
        return { latitude, longitude };
      })
    : [];
  const center =
    latitude && longitude
      ? { latitude, longitude }
      : // try using points as center
        points[0] && { latitude: points[0].latitude, longitude: points[0].longitude };
  const walking = Array.isArray(props.walking)
    ? props.walking.map((point: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const [latitude, longitude, address] = point.split(',');
        return { latitude, longitude, address };
      })
    : [];
  const driving = Array.isArray(props.driving)
    ? props.driving.map((point: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const [latitude, longitude, address] = point.split(',');
        return { latitude, longitude, address };
      })
    : [];

  useEffect(() => {
    return () => {
      if (typeof modalDestroyer === 'function') {
        modalDestroyer();
      }
    };
  }, []);

  const fullscreen = props.fullscreen;
  const fullscreenCls = fullscreen ? styles['map-fullscreen'] : styles['map-wrapper'];

  return (
    <div className={fullscreenCls} style={{ position: 'relative' }}>
      {!fullscreen && (
        <div
          className={styles['map-mask']}
          onClick={() => {
            modalDestroyer = useModal(
              <Modal fullscreen={true}>
                <MapComponent fullscreen={true} {...props} />
              </Modal>,
            );
          }}
        />
      )}
      <Map
        className={[styles.map, fullscreenCls].join(' ')}
        apiKey={apiKey}
        center={center}
        points={points}
        walking={walking}
        driving={driving}
        zoom={props.zoom}
        aerial={props.aerial}
      />
    </div>
  );
};

export default MapComponent;
