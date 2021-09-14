import React from 'react';
import moment from 'moment';
import { Steps } from 'antd-mobile';
import Icon from '@/components/icon';
import styles from './index.less';

const Step = Steps.Step;

interface Flight {
  airport: string;
  time: any;
}

interface FlightsProps {
  no: string;
  flights: Flight[];
}

export default function Flights(props: FlightsProps) {
  return (
    <div className={styles.flightWrapper}>
      <div className={styles.flightNo}>
        <span>{props.no}</span>
      </div>
      <Steps direction="horizontal">
        {Array.isArray(props.flights) &&
          props.flights.map((flightProps: any, index: number) => (
            <Step
              key={index.toString()}
              title={flightProps.airport}
              description={
                flightProps.time ? moment(flightProps.time).format('YYYY-MM-DD HH:mm') : null
              }
              icon={
                index === props.flights.length - 1 ? (
                  <Icon type={'icondest'} />
                ) : (
                  <Icon type={'iconflight'} />
                )
              }
            />
          ))}
      </Steps>
    </div>
  );
}
