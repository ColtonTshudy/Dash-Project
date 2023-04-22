import React from 'react'
import { Display } from "react-7-segment-display";

const SevenSegment = ({ className, value, max, color, height, width, scale}) => {
    const num = Math.trunc(value)
    let count = 1
    if (value > 1)
        count = Math.trunc(Math.log10(value))+1
    else if (value < -1)
        count = Math.trunc(Math.log10(-value))+2

    return (
        <div className={className} style={{width:`${width}px`, height:`${height}px`, margin: `${-height/2}px 0 0 ${-width/2}px`}}>
            <Display value={num} count={count} height={height*scale} color={color} />
        </div>
    );
}


export default SevenSegment