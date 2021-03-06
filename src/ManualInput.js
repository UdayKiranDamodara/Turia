import { useState, useContext, useEffect } from 'react'
import { PositionContext } from './contexts/Position'

const ManualInput = ({ manualInputRef }) => {

    const [position, setPosition] = useContext(PositionContext)
    const [input, setInput] = useState({
        m1: 0,
        m2: 0,
        s1: 0,
        s2: 0
    })

    useEffect(()=>{
        const time = (Number(input.s2)) + (10*Number(input.s1)) + (60*Number(input.m2)) + (600*Number(input.m1))
        console.log('m1:', input.m1)
        console.log('m2:', input.m2)
        console.log('s1:', input.s1)
        console.log('s2:', input.s2)
        console.log('time', time)
        let angleY = (Math.PI*time)/1800
        let angle = angleY - (Math.PI/2)
        const updatedValue = {
            x: Math.cos(angle)*250,
            y: Math.sin(angle)*250
        }
        console.log('updatedValue: ', updatedValue.x, updatedValue.y)
        setPosition(updatedValue)
    }, [input])

    return(
        <div ref={manualInputRef} className='manualInput-container-outer'>
        <div className='manualInput-container'>
            <input 
                className='input input-1' 
                type='text' maxLength='1' 
                value={input.m1} 
                onInput={event => {
                    console.log(event.target.value);
                    setInput((prevState)=>{
                        const newState = {...prevState}
                        newState.m1 = event.target.value.replace(/[^0-5]/g,'')
                        return newState
                    })
                }} 
                autoFocus={true} 
                />
            <input 
                className='input input-2' 
                type='text' maxLength='1' 
                value={input.m2} 
                onInput={event => {
                    console.log(event.target.value);
                    setInput((prevState)=>{
                        const newState = {...prevState}
                        newState.m2 = event.target.value.replace(/[^0-9]/g,'')
                        return newState
                    })
                }}                
                />
            <div>:</div>
            <input 
                className='input input-3' 
                type='text' maxLength='1' 
                value={input.s1} 
                onInput={event => {
                    console.log(event.target.value);
                    setInput((prevState)=>{
                        const newState = {...prevState}
                        newState.s1 = event.target.value.replace(/[^0-5]/g,'')
                        return newState
                    })
                }}               
                />
            <input 
                className='input input-4' 
                type='text' maxLength='1' 
                value={input.s2} 
                onInput={event => {
                    console.log(event.target.value);
                    setInput((prevState)=>{
                        const newState = {...prevState}
                        newState.s2 = event.target.value.replace(/[^0-9]/g,'')
                        return newState
                    })
                }}                
                />
        </div>
        </div>
    )
}

export default ManualInput