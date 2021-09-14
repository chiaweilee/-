import React, { useState } from 'react';
import moment from 'moment';

export default function (props: { date: any; nights?: number }) {
  const [detail, setDetail] = useState(false);
  const { date, nights } = props;

  function switchDetail() {
    setDetail(!detail);
  }

  return (
    <div onClick={switchDetail} style={{ marginBottom: '16px' }}>
      <i>{moment(date).format('Do MMM, YYYY')}</i>
      {detail && typeof nights === 'number' && (
        <i>
          {' - '}
          {moment(date).add(nights, 'd').format('Do MMM, YYYY')}
        </i>
      )}
      {!detail && typeof nights === 'number' && <i>, {nights} nights</i>}
    </div>
  );
}
