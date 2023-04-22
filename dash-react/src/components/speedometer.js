import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';

const Speedometer = ({ className, value, title, min, max, ticks, size}) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red at this percent

    useEffect(() => {
        gaugeRef.current = new RadialGauge({
            barStartPosition: 'left',
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: value,
            units: 'MPH',
            title: title,
            highlights: [],
            majorTicks: __linspace(min, max , ticks),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 3,
            colorNeedle: "rgb(255,0,0,1)",
            colorNeedleEnd: "rgb(255,0,0,1)",
            needleStart: 80,
            needleEnd: 100,
            colorValueBoxBackground: 'white',
            colorPlate: 'rgb(240,255,255,1)',
            fontValueSize: 60,
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            fontTitleSize: 30,
            fontTitleStyle: 'bold',
            ticksAngle: 270,
            startAngle: 45,
            valueBox: false,
            borders: true,
            borderShadowWidth: 0,
            exactTicks: false,
            needleCircleSize: 60,
            needleCircleInner: 0,
            colorNeedleCircleOuter: 'rgb(33, 44, 56)',
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    }, [value]);

    return (
        <div className={className} style={{margin: `${-size/2}px 0 0 ${-size/2}px`}}>
            <canvas ref={canvasRef} />
        </div>
    )
};

function __linspace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
  }

export default Speedometer;