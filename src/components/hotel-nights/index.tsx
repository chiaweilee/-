import React, { useState } from 'react';
import moment from 'moment';
import { getPropsFromChildren } from '@/components/helper';

export default function ({ children }) {
  const [detail, setDetail] = useState(false);
  const [dateNights] = getPropsFromChildren(children);
  if (!dateNights) return null;
  const [date, nights = 1] = dateNights.split(',');

  function switchDetail() {
    setDetail(!detail);
  }

  return (
    <div onClick={switchDetail} style={{ marginBottom: '16px' }}>
      <i>{moment(date).format('Do MMM, YYYY')}</i>
      {detail && nights && (
        <i>
          {' - '}
          {moment(date).add(Number(nights), 'd').format('Do MMM, YYYY')}
        </i>
      )}
      {!detail && nights && <i>, {nights} nights</i>}
    </div>
  );
}
