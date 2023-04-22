import './App.css';
import React, { useState, useEffect } from 'react';
import LedReadout from './components/led-readout.js';
import TemperatureGauge from './components/temperature.js';
import Speedometer from './components/speedometer.js'
import PowerInfo from './components/power-info.js'
import SevenSegment from './components/seven-segment';
import DateTime from './components/date-time.js';

function App() {

    const [data, setData] = useState({})
    const [fetchCount, setFetchCount] = useState({ count: 0 })

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
        const fetchTimeId = setTimeout(() => {
            setFetchCount(prevState => ({ count: prevState.count + 1 }))
        }, 10) //fetch normally every 10 ms
        return () => {
            clearTimeout(fetchTimeId) //reset fetch timer
        }
    }, [fetchCount])

    return (
        <div className="center-screen">
            <div className="viewport flex-container">
                <label>Moped Guage App</label>

                {Object.entries(data).map(([key, value]) => <label key={key} className='rawtext'>{key} = {Math.trunc(value * 100) / 100}</label>)}


                <TemperatureGauge value={data.mot_temp} className="motor-temp flex-center" title="Motor" min={0} max={100} ticks={5} size={200} />
                <TemperatureGauge value={data.mos_temp} className="mosfet-temp flex-center" title="Mosfet" min={0} max={100} ticks={5} size={150} />
                <Speedometer value={Math.abs(data.mph)} className="speedometer flex-center" title="" min={0} max={50} ticks={11} size={550} />
                <PowerInfo data={data} classname="power-info" />
                <DateTime className="clock" />

                <SevenSegment className="battery-voltage flex-center" value={data.battery_voltage} max={80} height={100} width={100} color='white' scale={0.7} />
                <SevenSegment className="speed-readout flex-center" value={data.mph} max={data.mph} height={175} width={300} color='white' scale={0.7} />
            </div>
        </div>
    );
}

export default App;