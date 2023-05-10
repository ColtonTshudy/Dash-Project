import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';

const TemperatureGauge = ({ className, value, title, min, max, ticks, size }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red at this percent

    const height = size * 2
    const width = size / 2

    const valColor = `rgb(255,${255 * (max * danger) / value},${255 * (max * danger) / value})`

    useEffect(() => {
        gaugeRef.current = new LinearGauge({
            renderTo: canvasRef.current,
            width: width,
            height: height,
            minValue: min,
            maxValue: max,
            title: title,
            fontTitleSize: 50,
            fontTitleStyle: 'bold',
            highlights: [],
            majorTicks: [0],
            minorTicks: 2,
            colorMajorTicks: 'rgb(0,0,0,0)',
            borders: false,
            colorPlate: 'rgb(0,0,0,0)',

            value: value,
            colorValueBoxBackground: null,
            fontValueSize: 85,
            fontNumbersSize: 25,
            valueBoxStroke: 0,
            valueInt: 2,
            valueDec: 0,
            fontValue: 'rubik',
            valueTextShadow: 'true',
            colorValueTextShadow: 'rgb(255,255,255,1)',

            colorValueText: 'black',
            fontUnitsSize: 25,
            barProgress: true,
            barStrokeWidth: 0,
            colorBarProgress: 'pink',
            colorBar: 'rgb(255,255,255,0.2)',
            needle: true,
            needleSide: 'right',
            needleWidth: 10,
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    });

    return (
        <div className={className}>
            <canvas ref={canvasRef} style={{ zIndex: 1 }} />
            <div style={{
                position: 'absolute',
                width: `57px`,
                height: `40px`,
                backgroundColor: valColor,
                bottom: '7%',
                left: '20%',
                borderRadius: '10px',
            }}>
                {/* <label style={{ transform: 'translate(50% 50%)', color: 'black', fontFamily: "Horizon", fontSize: 50 }}>{Math.trunc(value)}</label> */}
            </div>
        </div >
    )
};

export default TemperatureGauge;