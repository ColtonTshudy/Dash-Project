import './App.css';
import React, { useState, useEffect } from "react";


function App() {

  const [data, setData] = useState([{}])

  const url = "http://localhost:5000/can_data"

  useEffect(() => {
    fetch(url).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className="center-screen">
      <div className="viewport flex-container">
        <label>
          Moped Guage App
        </label>
      </div>
    </div>
  );
}

export default App;