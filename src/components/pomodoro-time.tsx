import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

const pim = require('../sounds/pim.mp3');
const pip = require('../sounds/pip.mp3');

const audioStartWorking = new Audio(pim);
const audioStopWorking = new Audio(pip);

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
  const [resting, setResting] = React.useState(false);
  
  React.useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.add('working');
  }, [working]);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, timeCounting ? 1000 : null);

  const configWorking = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  }

  const configResting = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longResetTime);
    } else {
      setMainTime(props.shortResetTime);
    }

    audioStopWorking.play();
  }

return (
  <div className="pomodoro">
    <h2>You are: Working</h2>
    <Timer mainTimer={mainTime}/>
    <div>
      <Button text="Work" onClick={() => configWorking()}></Button>
      <Button className={!working && !resting ? 'hidden': ''} text={timeCounting ? 'Pause' : 'Play'} onClick={() => setTimeCounting(!timeCounting)}></Button>
      <Button  text="Reset" onClick={() => configResting(false)}></Button>
    </div>
    <div>
      <p>sdfhsfhshf</p>
      <p>sdfhsfhshf</p>
      <p>sdfhsfhshf</p>
    </div>
  </div>
)
}
