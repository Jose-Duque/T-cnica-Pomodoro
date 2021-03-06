import React from 'react';
import { secondsToTime } from '../utils/secondsToTime';

interface Props {
  mainTimer: number;
}

export function Timer(props: Props) {
  return <div className="timer"> {secondsToTime(props.mainTimer)} </div>
}