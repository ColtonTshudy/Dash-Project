import './App.css';
import React, { useState, useEffect } from "react";
import Speedometer from './components/speedMeter.js'
import Currentmeter from './components/currentMeter.js'
import NewMeter from './components/newMeter.js'


function App() {
  const [state, setState] = useState({ count: 0 })

  useEffect(() => {
    const timeId = setTimeout(() => {
      setState(prevState => ({ count: (prevState.count + 0.1)%46 }))
    }, 1)

    return () => {
      clearTimeout(timeId)
    }
  }, [state.count])

  return (
    <div className="center-screen">
      <div className="viewport flex-container">
        <label>
          Moped Guage App
        </label>
        <Speedometer id="speedometer" className="flex-1" value={state.count} label="Test" />
        <Currentmeter id="battery-current" className="flex-1" value={state.count} label="Test" />
        <Currentmeter id="battery-current" className="flex-1" value={state.count} label="Test" />
      </div>
    </div>
  );
}

export default App;
