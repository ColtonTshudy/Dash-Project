import './App.css';
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LedReadout from './components/led-readout.js';
//import Dial from './components/dial.js';
import Speedometer from './components/speedMeter.js'
// import ReactP5Comp from './components/react_p5.js';

// Connect to socket
const url = "http://localhost:5001/"
const socket = io(url)

function App() {
  const [data, setData] = useState({})
  const [count, setCount] = useState({ count: 0 })

  // Setting up socket details
  socket.on('connect', (msg) => { console.log(msg) });
  socket.on('data', (can_data) => { setData(can_data); });

  useEffect(() => {
    console.log('updated')
    socket.emit('get_data');
    const retryTimeId = setTimeout(() => {
      setCount(prevState => ({ count: prevState.count + 1 }))
    }, 10000) //retry every 10 seconds

    return () => {
      clearTimeout(retryTimeId) //reset retry timer
    }
  }, [data, count])

  return (
    <div className="center-screen">
      <div className="viewport flex-container">
        <label>Moped Guage App</label>

        {Object.entries(data).map(([key, value]) => <label key={key} className='rawtext'>{key} = {Math.trunc(value * 100) / 100}</label>)}

        <LedReadout className="duty-readout flex-center" value={data.duty_cycle} max={1} />
        {/* <Dial className="speed-dial flex-center" value={data.mph} max={45}/> */}
        {/* <ReactP5Comp className="item2" /> */}
        <Speedometer id="test" className="speed-dial flex-center" value={data.mph} />

      </div>
    </div>
  );
}

export default App;