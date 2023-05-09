import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const CircleContainer = styled.div`
  display: inline-block;
  border-radius: 100%;
  position: relative;`



const StyledCircle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;`
// const CircleContainer = ({ children, style }) => <div className="react-super-progressbar__base" style={style}>{children}</div>
// const PercentageContainer = ({ children }) => <div className="react-super-progressbar__percentage-container">{children}</div>
// const StyledCircle = ({ children, ...props }) => <circle className="react-super-progressbar__styled-circle" {...props}>{children}</circle>

const RadialBar = ({
    min = 0,
    value = min,
    max,
    radius,
    strokeWidth,
    primaryColor,
    secondaryColor,
    fill,
    strokeLinecap,
    id,
    className,
    start,
    end,
}) => {
    const percentage = Math.abs((value-min) / (max-min));
    const PI = 3.14
    const R = (radius-strokeWidth)/2

    let color = []
    if (value >= 0)
        color = primaryColor
    else 
        color = secondaryColor

    let circumference = 2 * PI * R
    let gradientId = `${color[0]}${color[1]}`

    return (
        <div id={id} className={className} style={{margin: `${-radius/2}px 0 0 ${-radius/2}px`}}>
            <CircleContainer
                className="react-super-progressbar__base"
                style={{
                    height: `${radius}px`,
                    width: `${radius}px`,
                }}
            >

                <svg
                    width='100%'
                    height='100%'
                >
                    <linearGradient
                        id={gradientId}
                        x1='0%'
                        y1='0%'
                        x2='100%'
                        y2='0%'
                    >
                        <stop offset='0%' stopColor={color[0]} />
                        <stop offset='100%' stopColor={color[1]} />
                    </linearGradient>
                    <StyledCircle
                        strokeWidth={strokeWidth}
                        fill={fill}
                        r={R}
                        cx={radius / 2}
                        cy={radius / 2}
                        stroke={'rgb(0,0,0,.4)'}
                        strokeLinecap={strokeLinecap}
                        strokeDasharray={`${circumference*(end-start)} ${circumference}`}
                        strokeDashoffset={-circumference*start}
                    />
                    <StyledCircle
                        strokeWidth={strokeWidth}
                        fill={fill}
                        r={R}
                        cx={radius / 2}
                        cy={radius / 2}
                        stroke={`url(#${gradientId})`}
                        strokeLinecap={strokeLinecap}
                        strokeDasharray={`${percentage*circumference*(end-start)} ${circumference}`}
                        strokeDashoffset={-circumference*start}
                    />
                </svg>
            </CircleContainer>
        </div>
    )
}

RadialBar.propTypes = {
    value: PropTypes.number.isRequired,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeLinecap: PropTypes.oneOf(['round', 'square', 'butt']),
    fontSize: PropTypes.string,
    fontColor: PropTypes.string,
    fontFamily: PropTypes.string,
    primaryColor: PropTypes.array,
    secondaryColor: PropTypes.array,
    fill: PropTypes.string,
    hidePercentageText: PropTypes.bool,
}

RadialBar.defaultProps = {
    width: 200,
    strokeWidth: 5,
    strokeLinecap: 'round',
    fontSize: 'inherit',
    fontColor: 'inherit',
    fontFamily: 'inherit',
    primaryColor: ['#00BBFF', '#92d7f1'],
    secondaryColor: 'transparent',
    fill: 'transparent',
}

export default RadialBar