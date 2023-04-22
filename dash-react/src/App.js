import './App.css';
import React, { useState, useEffect } from 'react';
import LedReadout from './components/led-readout.js';
import TemperatureGauge from './components/temperature.js';
import Speedometer from './components/speedometer.js'
import PowerInfo from './components/power-info.js'
import { Display } from "react-7-segment-display";

function App() {

    const [data, setData] = useState({})
    const [count, setCount] = useState({ count: 0 })

    const url = "http://localhost:5001/can_data"

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

                <LedReadout className="duty-readout flex-center" value={data.duty_cycle} max={1} />
                <h1 className="temporary">{data.motor_current}</h1>

                <div className="battery-voltage flex-column">
                    <Display value={Math.trunc(data.battery_voltage)} height={100} color='gold'/>
                </div>


                <TemperatureGauge value={data.mot_temp} className="motor-temp flex-center" title="Motor" min={0} max={100} ticks={5} size={250} />
                <TemperatureGauge value={data.mos_temp} className="mosfet-temp flex-center" title="Mosfet" min={0} max={100} ticks={5} size={150} />
                <Speedometer value={Math.abs(data.mph)} className="speedometer flex-center" title="" min={0} max={50} ticks={11} size={625} />
                <PowerInfo data={data} classname="power-info" />
            </div>
        </div>
    );
}

export default App;