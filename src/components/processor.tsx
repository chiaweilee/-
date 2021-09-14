import React from 'react';
import HotelNights from '@/components/hotel-nights';
import Img from '@/components/img';
import Imgs from '@/components/imgs';
import Cryptor from '@/components/cryptor';
import CryptorImg from '@/components/cryptorImg';
import Map from '@/components/map';
import AutoSpeak from '@/components/auto-speak';
import Flights from '@/components/flights';
import { getFlightNo, getAirport, getFlightDateTime } from '@/components/flights/util';
import { getListFromInline, getPropsFromChildren, getPropsFromInline } from '@/components/helper';

const { key } = require('../loaders/config');

export default function processor(lang, children) {
  switch (lang) {
    case key['hotel-nights']:
      const [date, nights = '1'] = getPropsFromChildren(children)[0].split(',');
      return <HotelNights date={date} nights={Number(nights)} />;
    case key.image:
      const [srcImage, propsInlineImage] = getPropsFromChildren(children);
      return <Img src={srcImage} alt="" {...getPropsFromInline(propsInlineImage)} />;
    case key.images:
      const [itemsString, propsInlineImages] = getPropsFromChildren(children);
      const items: any[] = typeof itemsString === 'string' ? itemsString.split(',') : [];
      return <Imgs items={items} {...getPropsFromInline(propsInlineImages)} />;
    case key.secret:
      return <Cryptor>{getPropsFromChildren(children)[0]}</Cryptor>;
    case key['secret-image']:
      const [srcSecretImage, propsInline] = getPropsFromChildren(children);
      return <CryptorImg src={srcSecretImage} {...getPropsFromInline(propsInline)} />;
    case key['bing-map']:
      const propsList = getPropsFromChildren(children);
      const nativeProps = Object.assign({}, ...propsList.map(getPropsFromInline));
      return (
        <Map
          {...{
            ...nativeProps,
            driving: getListFromInline(nativeProps.driving),
            points: getListFromInline(nativeProps.points),
            walking: getListFromInline(nativeProps.walking),
          }}
        />
      );
    case key.pronounce:
      return <AutoSpeak>{children}</AutoSpeak>;
    case key.airasia:
      const airports = getAirport(children);
      const flightDateTimes = getFlightDateTime(children);
      return (
        <Flights
          no={getFlightNo(children)}
          flights={[
            {
              airport: airports[0],
              time: flightDateTimes[0],
            },
            {
              airport: airports[1],
              time: flightDateTimes[1],
            },
          ]}
        />
      );
    default:
      return null;
  }
}
