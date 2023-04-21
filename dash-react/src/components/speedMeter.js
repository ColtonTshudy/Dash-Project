import React from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";

const Speedometer = ({ id, className, value }) => {
  return(
    <div id={id} className={className}>
        <CircularProgressbar
          value={value}
          circleRatio={0.5}
          strokeWidth={10}
          maxValue={45}
          background={false}
          counterClockwise={false}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.5,
        
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.001,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            pathColor: `rgba(255,150,255,255)`,
            textColor: '#f88',
            trailColor: 'black',
            backgroundColor: 'black',
          })}
        />
    </div>
  )
}

export default Speedometer;