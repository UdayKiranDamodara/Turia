import { PositionContext } from './contexts/Position'

import { useContext, useEffect, useRef } from "react"

const MovablePoint = () => {

    const [position, setPosition] = useContext(PositionContext)

    const movablePoint = useRef()

    const handleMouseDown = (event) => {
        // console.log(event.pageX, event.pageY)
        movablePoint.current.addEventListener('mousemove', handleMouseMove)


        movablePoint.current.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (event) => {
        // console.log(event.layerX, event.layerY)
        const temp = {
            x: event.layerX-300,
            y: event.layerY-300
        }
        let slope = Math.atan2(temp.y, temp.x)
        const updatedValue = {
            x: Math.cos(slope)*250,
            y: Math.sin(slope)*250
        }
        console.log('temp', temp)
        console.log('updatedValue', updatedValue)
        setPosition(updatedValue)
    }

    const handleMouseUp = (event) => {
        movablePoint.current.removeEventListener('mouseup', handleMouseUp)
        movablePoint.current.removeEventListener('mousemove', handleMouseMove)
        console.log('removed')
    }

    useEffect(()=>{
        // movablePoint.current.style.transform = `translate(285px, 285px)`
        movablePoint.current.style.transform = `translate(${285+position.x}px, ${285+position.y}px)`
        // const rect = movablePoint.current.getBoundingClientRect()
        // console.log(rect)
    }, [position])

    return(
        // <svg className='movable-point' width='600' height='600'>
        //     <circle cx={300+position.x} cy={300+position.y} r='13' stroke='blue' strokeWidth='1' fill='blue' />
        // </svg>
        <div className='movable-point-div' ref={movablePoint} onMouseDown={handleMouseDown} />
    )
}

export default MovablePoint