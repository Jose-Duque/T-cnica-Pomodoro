import React, { useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/secondsToTime';
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
  const [cyclesQtd, setCyclesQtd] = React.useState(new Array(props.cycles - 1).fill(true));
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkimgTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

  useInterval(() => {
    setMainTime(mainTime - 1);
    if (working) setFullWorkingTime(fullWorkimgTime + 1);
  }, timeCounting ? 1000 : null);

  const configWorking = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  },[props.pomodoroTime]);

  
  const configResting = useCallback((long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longResetTime);
    } else {
      setMainTime(props.shortResetTime);
    }

    audioStopWorking.play();
  },[setTimeCounting, setWorking, setResting, setMainTime, props.longResetTime, props.shortResetTime]);

  React.useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.add('working');

    if (mainTime > 0) return;

    if (working && cyclesQtd.length > 0) {
      configResting(false);
      cyclesQtd.pop();
    } else if (working && cyclesQtd.length <= 0) {
      configResting(true);
      setCyclesQtd(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoro(numberOfPomodoro + 1);
    if (resting) configWorking();
  }, [mainTime, timeCounting, working, resting, cyclesQtd, completedCycles, fullWorkimgTime, numberOfPomodoro,
    setMainTime, setTimeCounting, setWorking, setResting, setCyclesQtd, setCompletedCycles, setFullWorkingTime, setNumberOfPomodoro,
    props.cycles, configResting, configWorking
  ]);
  
  
return (
  <div className="pomodoro">
    <h2>You are: {working ? 'Trabalhando': 'Descansando'}</h2>
    <Timer mainTimer={mainTime}/>
    <div>
      <Button text="Work" onClick={() => configWorking()}></Button>
      <Button className={!working && !resting ? 'hidden': ''} text={timeCounting ? 'Pause' : 'Play'} onClick={() => setTimeCounting(!timeCounting)}></Button>
      <Button  text="Reset" onClick={() => configResting(false)}></Button>
    </div>
    <div>
      <p>Ciclos concluídos: {completedCycles}</p>
      <p>Horas trabahadas: {secondsToTime(fullWorkimgTime)}</p>
      <p>Numeros de Pomodoros: {numberOfPomodoro}</p>
    </div>
  </div>
)
}
