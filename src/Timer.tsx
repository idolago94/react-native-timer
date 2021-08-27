import React, { useEffect, useState, useRef } from 'react';
import { Text } from 'react-native';
// import PropTypes from 'prop-types';

export interface TimerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
  autoStart?: boolean;
}

const Timer: React.FC<TimerProps> = ({
  hours = 0,
  minutes = 0,
  seconds,
  autoStart
}) => {
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds?: number;
  }>({ hours, minutes, seconds });
  let timerRef: ReturnType<typeof setInterval> = setInterval(() => {  });
  useEffect((): any => {
    console.log('---- useEffect ----');
    autoStart && startTimer();
    return () => timerRef && clearInterval(timerRef);
  }, []);

  const startTimer = (): void => { console.log("---- startTimer ----"); timerRef = setInterval(continueTimer, seconds !== undefined ? 1000 : 10000) };

  const stopTimer = (): void => { console.log("---- stopTimer ----"); clearInterval(timerRef) }

  const continueTimer = (): void => {
    let newTimeObj = time;
    if (seconds !== undefined && newTimeObj.seconds && newTimeObj.seconds > 0) {
      newTimeObj.seconds -= 1;
    } else if (newTimeObj && newTimeObj.minutes > 0) {
      newTimeObj.minutes -= 1;
      newTimeObj.seconds = 59;
    } else if (newTimeObj && newTimeObj.hours > 0) {
      newTimeObj.hours -= 1;
      newTimeObj.minutes = 59;
      newTimeObj.seconds = 59;
    } else {
      stopTimer();
    }
    setTime({ ...newTimeObj });
  };

  const getTime = (v: number): string => (v < 10 ? '0' + v : v.toString());

  return (
    <Text>
      {getTime(time.hours)}:{getTime(time.minutes)}
      {seconds === undefined
        ? ''
        : `:${time.seconds ? getTime(time.seconds) : '00'}`}
    </Text>
  );
};

export default Timer;
