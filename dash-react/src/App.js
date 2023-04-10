import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState({})

  const url = "http://localhost:5000/can_data"

  useEffect(() => {
    const timeId = setTimeout(() => {
      fetch(url).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
    }, 100)

    return () => {
      console.log("cleaned")
      clearTimeout(timeId)
    }
  }, [data])

  return (
    <div className="center-screen">
      <div className="viewport flex-container">
        <label>
          Moped Guage App
        </label>

        {Object.entries(data).map( ([key, value]) => <label key={key} className='rawtext'>{key} = {Math.trunc(value*100)/100}</label> )}

      </div>
    </div>
  );
}

export default App;