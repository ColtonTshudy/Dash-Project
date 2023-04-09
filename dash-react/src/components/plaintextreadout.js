const PlaintextReadout = ({data}) => {
    return(
        Object.entries(data).map( ([key, value]) => <p key={key}>`${key} = ${value}`</p> )
    )
}

export default PlaintextReadout;