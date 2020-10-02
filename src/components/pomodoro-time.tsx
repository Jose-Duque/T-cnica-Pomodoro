import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortResetTime: number;
  longResetTime: number;
  cycles: number;
}

export function PomodoroTime(props: Props) {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  
  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000)
return (
  <div className="pomodoro">
    <h2>You are: Working</h2>
    <Timer mainTimer={mainTime}/>
    <Button text="test" onClick={() => alert('teste')} />
  </div>
)
}