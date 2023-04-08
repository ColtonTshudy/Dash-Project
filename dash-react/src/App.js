import './App.css';
import React, { useState, useEffect } from "react";


function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/members').then(
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


        {(typeof data.members === 'undefined') ? (
          <p>loading...</p>
        ) : (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )}


      </div>
    </div>
  );
}

export default App;