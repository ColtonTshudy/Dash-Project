import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';

const Speedometer = ({ className, value, min, max, ticks, size, soc }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();

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
            highlights: [],
            majorTicks: __linspace(min, max , ticks),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 5,
            colorNeedleEnd: "rgb(255,0,0,1)",
            colorNeedleShadowDown: "rgb(0,0,0,1)",
            needleStart: 50,
            needleEnd: 100,
            colorValueBoxBackground: 'white',
            colorPlate: 'rgb(240,255,255,1)',
            fontValueSize: 60,
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            ticksAngle: 270,
            startAngle: 45,
            valueBox: false,
            borders: true,
            borderShadowWidth: 0,
            exactTicks: false,
            needleCircleSize: 0,
            needleCircleInner: 0,
            colorNeedleCircleOuter: 'black',
            colorNeedleCircleOuterEnd: 'black',
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    }, [value]);

    return (
        <>
        <div className={className} style={{margin: `${-size/2}px 0 0 ${-size/2}px`}}>
            <canvas ref={canvasRef} />
        </div>
        <div className={className} style={{
            margin: `${-300/2}px 0 0 ${-300/2}px`,
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'black',
            boxShadow:
            `0 0 20px 10px rgb(${255 * (1 - soc + 0.5)},${255 * (soc + .4)},${100},.75),`+
            `inset 0 0 50px 10px rgb(${255 * (1 - soc + 0.5)},${255 * (soc + .4)},${100},.75)`,
            zIndex: 5,
        }}/>
        </>
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