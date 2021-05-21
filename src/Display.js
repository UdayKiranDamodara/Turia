import { useState, useContext, useEffect } from 'react'
import { PositionContext } from './contexts/Position'

const Display = () => {
    const [position, setPosition] = useContext(PositionContext)
    const [timeRemaining, setTimeRemaining] = useState(3600)

    useEffect(()=>{
        let slope = Math.atan2(position.y, position.x)
        slope = (slope>0) ? slope : slope+(2*Math.PI)
        let slopeY = slope + (Math.PI/2)
        setTimeRemaining(Math.floor((1800*slopeY)/Math.PI))
    }, [position])

    return(
        <div className='time-display'>
            {`${Math.floor(timeRemaining/60)}:${timeRemaining%60}`}
        </div>
    )
}

export default Display