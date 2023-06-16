import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';

const SoC = ({ className, value, size }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const danger = 0.5; // Start making number red under this percent

    const height = size * 2
    const width = size / 3
    var justify = Math.floor(Math.log10(value)) < 1 ? 'center' : 'left'

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

            value: value * 100 - 1,
            valueBox: false,

            barProgress: true,
            barStrokeWidth: 0,
            colorBarProgress: `rgb(${255 * (1 - value + 0.5)},${255 * (value + .4)},${100},1)`,
            colorBar: 'rgb(0,0,0,0.5)',
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
            <canvas ref={canvasRef} style={{ zIndex: 1 }} />
            <div style={{
                position: 'absolute',
                width: `57px`,
                height: `40px`,
                backgroundColor: 'rgb(100,100,100,0.5)',
                bottom: '-2%',
                left: '5%',
                borderRadius: '10px',
                fontFamily: 'Rubik',
                fontSize: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: justify,
                textShadow: '0 0 10px black',
                boxShadow: `0 0 30px rgb(${255 * (1 - value + 0.5)},${255 * (value + .4)},${100},.75)`,
            }}>
                {Math.floor(value*100)-1}
            </div>
        </div >
    )
};

export default SoC;