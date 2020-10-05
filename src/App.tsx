import React from 'react';
import { PomodoroTime } from './components/pomodoro-time';

import './App.css';

function App() {
  return (
    <div className="App">
      <PomodoroTime 
       pomodoroTime={10}
       shortResetTime={3}
       longResetTime={9}
       cycles={4} 
      />
    </div>
  );
}

export default App;

