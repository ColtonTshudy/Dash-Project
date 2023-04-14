import './App.css';
import React, { useState, useEffect } from "react";
import P5Comp from './components/P5.js';
import ReactP5Comp from './components/react_p5.js';

function App() {

  const [data, setData] = useState({})
  const [count, setCount] = useState({ count: 0 })

  const url = "http://localhost:5000/can_data"

  useEffect(() => {
    fetch(url).then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json()
    })
      .then(
        data => {
          setData(data)
          console.log(data)
        }
      )
      .catch(err => {
        console.log(err)
      })
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

        <P5Comp className="item" fragShader="/shaders/led-progress.frag" />

        <ReactP5Comp className="item2" />

      </div>
    </div>
  );
}

export default App;