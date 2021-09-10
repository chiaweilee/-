import React, { useState } from 'react';
import moment from 'moment';

export default function (props: { children: string }) {
  const [detail, setDetail] = useState(false);
  const { children } = props;
  if (!children) return null;
  const [date, nights = 1] = children.split(',');

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
