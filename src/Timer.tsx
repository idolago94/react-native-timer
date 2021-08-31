import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';
// import PropTypes from 'prop-types';

// export interface TimerProps {
//   hours?: number;
//   minutes?: number;
//   seconds?: number;
//   autoStart?: boolean;
//   ref?: any;
// }

type TimerProps = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  autoStart?: boolean;
  ref?: any;
}

const Timer: React.FC<TimerProps> = forwardRef(({
  hours = 0,
  minutes = 0,
  seconds,
  autoStart
}, ref) => {
  let timerRef: ReturnType<typeof setInterval> = setInterval(() => { });
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds?: number;
  }>({ hours, minutes, seconds });
  useEffect((): any => {
    autoStart && startTimer();
    return () => timerRef && clearInterval(timerRef);
  }, []);

  useImperativeHandle(ref, () => ({
    start: startTimer,
    reset: resetTimer,
    stop: stopTimer
  }));

  const resetTimer = (): void => { console.log('---- resetTimer ----'); setTime({ hours, minutes, seconds }) }

  const startTimer = (): void => { 
    if (!time.hours && !time.minutes && !time.seconds) {
      console.warn('Can not start timer from zero!')
      return
    }
    console.log("---- startTimer ----"); 
    timerRef = setInterval(continueTimer, seconds !== undefined ? 1000 : 10000) 
  }

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
      return
    }
    setTime({ ...newTimeObj })
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
})

export default Timer;
