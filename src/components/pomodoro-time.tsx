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
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  
  React.useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, timeCounting ? 1000 : null);

  const configWorking = () => {
    setTimeCounting(true);
    setWorking(true);
  }

return (
  <div className="pomodoro">
    <h2>You are: Working</h2>
    <Timer mainTimer={mainTime}/>
    <div>
      <Button text="Work" onClick={() => configWorking()}></Button>
      <Button text={timeCounting ? 'Pause' : 'Play'} onClick={() => setTimeCounting(!timeCounting)}></Button>
      <Button text="test" onClick={() => alert('teste')}></Button>
    </div>
    <div>
      <p>sdfhsfhshf</p>
      <p>sdfhsfhshf</p>
      <p>sdfhsfhshf</p>
    </div>
  </div>
)
}
