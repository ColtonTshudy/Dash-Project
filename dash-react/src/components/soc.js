import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';

const SoC = ({ className, value, size }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red under this percent

    const height = size * 2
    const width = size / 3

    useEffect(() => {
        gaugeRef.current = new LinearGauge({
            renderTo: canvasRef.current,
            width: width,
            height: height,
            minValue: 0,
            maxValue: 99,
            highlights: [],
            majorTicks: [0],
            minorTicks: 2,
            colorMajorTicks: 'rgb(0,0,0,0)',
            borders: false,
            colorPlate: 'rgb(0,0,0,0)',

            value: value*100-1,
            colorValueBoxBackground: null,
            fontValueSize: 130,
            fontNumbersSize: 25,
            valueBoxStroke: 0,
            valueInt: 2,
            valueDec: 0,
            fontValue: 'Rubik',
            valueTextShadow: 'true',
            colorValueTextShadow: 'rgb(255,255,255,1)',

            colorValueText: 'black',
            fontUnitsSize: 25,
            barProgress: true,
            barStrokeWidth: 0,
            colorBarProgress: 'rgb(100,255,100,1)',
            colorBar: 'rgb(255,255,255,0.2)',
            needle: false,
            barBeginCircle: false,
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    });

    return (
        <div className={className}>
            <canvas ref={canvasRef} style={{ }} />
            <div style={{
                position: 'absolute',
                width: `57px`,
                height: `40px`,
                backgroundColor: 'white',
                bottom: '8%',
                left: '5%',
                borderRadius: '10px',
                zIndex: -1
            }}>
                {/* <label style={{ bottom:'50%', color: 'black', fontFamily: "rubik", fontSize: 42 }}>{Math.trunc(value*100)}</label> */}
            </div>
        </div >
    )
};

export default SoC;