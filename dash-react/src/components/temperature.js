import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';

const TemperatureGauge = ({ className, value, title, min, max, ticks, size}) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red at this percent

    useEffect(() => {
        gaugeRef.current = new RadialGauge({
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: value,
            units: '°C',
            title: title,
            highlights: [
                {
                    "from": max*danger,
                    "to": max,
                    "color": "rgba(255, 0, 0, .2)"
                }
            ],
            majorTicks: __linspace(min, max, ticks),
            minorTicks: 2,
            needleType: "arrow",
            colorNeedle: "red",
            colorNeedleEnd: "red",
            colorValueBoxBackground: `rgb(255,${255*(max*danger)/value},${255*(max*danger)/value})`,
            fontValueSize: 60,
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            fontTitleSize: 30,
            fontTitleStyle: 'bold'
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

export default TemperatureGauge;