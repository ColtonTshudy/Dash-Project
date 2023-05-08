import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';

const TemperatureGauge = ({ className, value, title, min, max, ticks, size}) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red at this percent

    useEffect(() => {
        gaugeRef.current = new LinearGauge({
            renderTo: canvasRef.current,
            width: size/2,
            height: size*2,
            minValue: min,
            maxValue: max,
            value: value,
            title: title,
            fontTitleSize: 50,
            fontTitleStyle: 'bold',
            highlights: [],
            majorTicks: [0],
            minorTicks: 2,
            colorMajorTicks: 'rgb(0,0,0,0)',
            borders: false,
            colorPlate: 'rgb(0,0,0,0)',

            colorValueBoxBackground: `rgb(255,${255*(max*danger)/value},${255*(max*danger)/value})`,
            fontValueSize: 65,
            fontNumbersSize: 25,
            valueBoxStroke: 0,
            valueInt: 2,
            valueDec: 0,

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
            <canvas ref={canvasRef} />
        </div>
    )
};

export default TemperatureGauge;