import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

import TemperatureGauge from './components/temperature.js';
import Speedometer from './components/speedometer.js'
import SevenSegment from './components/seven-segment';
import DateTime from './components/date-time.js';
import motorIcon from './images/motor.png';
import mosfetIcon from './images/mosfet.jpg';
import RadialBar from './components/radial-progress';
import ValueBox from './components/valuebox'
import SoC from './components/soc';

// Connect to socket
const url = "http://localhost:5001/"
const socket = io(url)

function App() {

    const [data, setData] = useState({})
    const [config, setConfig] = useState({})

    // Get the config from the server
    useEffect(() => {
        // Setting up socket details
        socket.on('connect', (msg) => { console.log(msg) });
        socket.on('data', (can_data) => { setData(can_data); });

        fetch(`${url}/config_data`).then(res => {
            if (res.status >= 400) {
                throw new Error("Server responds with error!");
            }
            return res.json()
        })
            .then(
                data => {
                    setConfig(data)
                }
            )
            .catch(err => {
                console.log(err)
            })

        // On unmount
        return () => {
            console.log('disconnected')
            socket.disconnect()
        }
    }, [])

    // Request CAN data whenever new data is recieved
    useEffect(() => {
        socket.emit('get_data');
    }, [data])

    const max_speed = 50;
    const capacity_ah = 16;

    return (
        <div className="center-screen">
            <div className="viewport flex-container">
                <label className="background">Moped Guage App</label>

                {/* {Object.entries(data).map(([key, value]) => <label key={key} className='rawtext'>{key} = {Math.trunc(value * 100) / 100}</label>)} */}

                <TemperatureGauge value={data.mot_temp} className="motor-temp flex-center" min={0} max={100} ticks={5} size={200} />
                <TemperatureGauge value={data.mos_temp} className="mosfet-temp flex-center" min={0} max={100} ticks={5} size={200} />
                <Speedometer value={Math.abs(data.mph)} className="speedometer center-gauge" title="" min={0} max={max_speed} ticks={11} size={550} />

                <DateTime className="clock font-face-dot" />

                {/* <SevenSegment className="battery-voltage flex-center" value={data.battery_voltage} decimals={1} max={80} height={100} width={170} color='red' scale={0.7} /> */}
                <SevenSegment className="center-gauge flex-center" value={data.mph} max={data.mph} height={125} width={300} color='white' scale={1.0} />

                <img src={motorIcon} id="motor-icon" alt="motor temp icon" />
                <img src={mosfetIcon} id="mosfet-icon" alt="mosfet temp icon" />

                {/* <RadialBar className="center-gauge mph-progress" value={data.mph} primaryColor={['red','red']} max={50} radius={560} strokeWidth={25} start={0.005} end={0.743} strokeLinecap={'square'}/> */}
                <RadialBar className="center-gauge" value={data.motor_current} primaryColor={['red', 'orange']} secondaryColor={['lime', 'green']} max={150} radius={610} strokeWidth={20} start={.6} end={.9} />
                <RadialBar className="center-gauge" value={data.battery_current} primaryColor={['orange', 'yellow']} secondaryColor={['lime', 'green']} max={80} radius={700} strokeWidth={30} start={.63} end={.87} />

                <RadialBar className="center-gauge" mirror={true} value={data.motor_voltage} primaryColor={['red', 'orange']} secondaryColor1={['lime', 'green']} max={58.8} radius={610} strokeWidth={20} start={.6} end={.9} />
                <RadialBar className="center-gauge" mirror={true} value={data.battery_voltage} primaryColor={['orange', 'yellow']} secondaryColor={['lime', 'green']} min={40} max={58.8} radius={700} strokeWidth={30} start={.63} end={.87} />

                <ValueBox className="odometer font-face-dot" value={data.odometer} decimals={2} fontsize={30} units="MI" width={250}/>

                <ValueBox className="voltmeter font-face-segment" value={data.battery_voltage} units='V' decimals={1} color={'red'} fontsize={60} width={210} bgcolor='black'/>
                
                <SoC className="soc" value={(capacity_ah-data.ah_consumed)/capacity_ah} size={200} />
            </div>
        </div>
    );
}

export default App;