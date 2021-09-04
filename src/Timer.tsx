import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
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
  let timeInterval = useRef<ReturnType<typeof setInterval> | null>()
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds?: number;
  }>({ hours, minutes, seconds });
  useEffect((): any => {
    autoStart && startTimer();
    return () => timeInterval.current && clearInterval(timeInterval.current);
  }, []);

  useImperativeHandle(ref, () => ({
    start: startTimer,
    reset: resetTimer,
    stop: stopTimer
  }));

  const resetTimer = (): void => {
    console.log('---- resetTimer ----');
    if (timeInterval.current) stopTimer()
    setTime({ hours, minutes, seconds })
  }

  const startTimer = (): void => {
    if (!time.hours && !time.minutes && !time.seconds) {
      console.warn('Can not start timer from zero!')
      return
    } else if (timeInterval.current) {
      console.warn('Timer is allready running!')
      return
    }
    console.log("---- startTimer ----");
    timeInterval.current = setInterval(continueTimer, seconds !== undefined ? 1000 : 10000)
  }

  const stopTimer = (): void => {
    if (!timeInterval.current) {
      console.warn('Timer is not running!')
      return
    }
    console.log("---- stopTimer ----");
    clearInterval(timeInterval.current);
    timeInterval.current = null
  }

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
