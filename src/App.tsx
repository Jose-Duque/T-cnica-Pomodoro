import React from 'react';
import { PomodoroTime } from './components/pomodoro-time';

import './App.css';

function App() {
  return (
    <div className="App">
      <PomodoroTime 
       pomodoroTime={1500}
       shortResetTime={300}
       longResetTime={0}
       cycles={4} 
      />
    </div>
  );
}

export default App;

