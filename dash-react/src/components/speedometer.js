import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';

const Speedometer = ({ className, value, title, min, max, ticks, size}) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red at this percent

    useEffect(() => {
        gaugeRef.current = new RadialGauge({
            barStartPosition: 'right',
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: value,
            units: 'MPH',
            title: title,
            highlights: [],
            majorTicks: __linspace(max, min, ticks),
            minorTicks: 5,
            needleType: "arrow",
            needleWidth: 5,
            colorNeedle: "red",
            colorNeedleEnd: "red",
            colorValueBoxBackground: 'white',
            fontValueSize: 60,
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            fontTitleSize: 30,
            fontTitleStyle: 'bold',
            ticksAngle: 180,
            startAngle: 180,
            valueBox: false,
            borders: false,
            borderShadowWidth: 0,
            exactTicks: false
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    }, [value]);

    return (
        <div className={className}>
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