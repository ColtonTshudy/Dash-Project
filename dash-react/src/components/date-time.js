import React, { useState, useEffect } from 'react'

const DateTime = ({ className }) => {

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    return (
        <div className={className}>
            <label>{`${date.toLocaleTimeString()}`}</label>
        </div>
    )
}

export default DateTime