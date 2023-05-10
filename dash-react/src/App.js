import './App.css';
import React, { useState, useEffect } from 'react';
import TemperatureGauge from './components/temperature.js';
import Speedometer from './components/speedometer.js'
import SevenSegment from './components/seven-segment';
import DateTime from './components/date-time.js';
import './fonts/led_counter-7/led_counter-7.ttf';
import motorIcon from './images/motor.png';
import mosfetIcon from './images/mosfet.jpg';
import RadialBar from './components/radial-progress';

function App() {

    const [data, setData] = useState({})
    const [fetchCount, setFetchCount] = useState({ count: 0 })
    const [config, setConfig] = useState({})

    const url = "http://localhost:5001"

    // Get the config from the server
    useEffect(() => {
        fetch(`${url}/config_data`).then(res => {
            if (res.status >= 400) {
                throw new Error("Server responds with error!");
            }
            return res.json()
        })
            .then(
                data => {
                    setConfig(data['DASH_SETTINGS'])
                }
            )
            .catch(err => {
                console.log(err)
            })
    }, [])

    // Get CAN data every 10 milliseconds
    useEffect(() => {
        fetch(`${url}/can_data`).then(res => {
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
                <label className="background">Moped Guage App</label>

                {/* {Object.entries(data).map(([key, value]) => <label key={key} className='rawtext'>{key} = {Math.trunc(value * 100) / 100}</label>)} */}

                <TemperatureGauge value={data.mot_temp} className="motor-temp flex-center" min={0} max={100} ticks={5} size={200} />
                <TemperatureGauge value={data.mos_temp} className="mosfet-temp flex-center" min={0} max={100} ticks={5} size={200} />
                <Speedometer value={Math.abs(data.mph)} className="speedometer center-gauge" title="" min={0} max={config.max_speed} ticks={11} size={550} />

                <DateTime className="clock font-face-dot" />

                <SevenSegment className="battery-voltage flex-center" value={data.battery_voltage} decimals={1} max={80} height={100} width={170} color='red' scale={0.7} />
                <SevenSegment className="center-gauge flex-center" value={data.mph} max={data.mph} height={125} width={300} color='white' scale={1.0} />

                <img src={motorIcon} id="motor-icon" alt="motor temp icon"/>
                <img src={mosfetIcon} id="mosfet-icon" alt="mosfet temp icon"/>

                {/* <RadialBar className="center-gauge mph-progress" value={data.mph} primaryColor={['red','red']} max={50} radius={560} strokeWidth={25} start={0.005} end={0.743} strokeLinecap={'square'}/> */}
                <RadialBar className="center-gauge" value={data.motor_current} primaryColor={['red', 'orange']} secondaryColor={['lime', 'green']} max={150} radius={610} strokeWidth={20} start={.6} end={.9} />
                <RadialBar className="center-gauge" value={data.battery_current} primaryColor={['orange', 'yellow']} secondaryColor={['lime', 'green']} max={80} radius={700} strokeWidth={30} start={.63} end={.87} />

                <RadialBar className="center-gauge flip-y" value={data.motor_voltage} primaryColor={['red', 'orange']} secondaryColor={['lime', 'green']} max={58.8} radius={610} strokeWidth={20} start={.6} end={.9} />
                <RadialBar className="center-gauge flip-y" value={data.battery_voltage} primaryColor={['orange', 'yellow']} secondaryColor={['lime', 'green']} min={40} max={58.8} radius={700} strokeWidth={30} start={.63} end={.87} />
            </div>
        </div>
    );
}

export default App;