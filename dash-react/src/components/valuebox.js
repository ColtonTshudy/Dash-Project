import React from 'react'

const ValueBox = ({ className, value, units, fontsize, width, decimals }) => {
    const height = fontsize * 1.1;
    const padding = fontsize / 10;
    const decimal_mp = Math.pow(10, decimals);

    return (
        <div className={className} style={{
            margin: `${-height / 2}px 0 0 ${-width / 2}px`,
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '10px',
            textAlign: 'right',
            fontSize: `${fontsize}px`,
            padding: `${padding}px`,
        }}>
            {padZeros(decimals, Math.round(value * decimal_mp) / decimal_mp)} {units}
        </div>
    );
}

// Adds zeroes to the end to fill up desired decimal places
const padZeros = (decimals, value) => {
    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}


export default ValueBox