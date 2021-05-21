import { PositionContext } from './contexts/Position'

import FixedPoint from './FixedPoint'
import MovablePoint from './MovablePoint'
// import Display from './Display'
import ManualInput from './ManualInput'

import './App.css';
import { useContext, useEffect, useRef, useState } from 'react';

function App() {
  let Timer = null

  const [timerName, setTimerName] = useState('')

  const [position, setPosition] = useContext(PositionContext)
  const [displayTime, setDisplayTime] = useState(3600)
  const [initialDisplayTime, setInitialDisplayTime] = useState(3600)

  const [active, setActive] = useState(true)

  const manualInputRef = useRef()

  // let timeRemaining = 3600

  useEffect(()=>{
    console.log('position for arc', position)
    let slope = Math.atan2(position.y, position.x)
    slope = (slope>0) ? slope : slope+(2*Math.PI)
    let slopeY = slope + (Math.PI/2)
    let temp = Math.floor((1800*slopeY)/Math.PI)
    temp = (temp>3600) ? (temp-3600) : temp
    setInitialDisplayTime(temp)
  }, [position])

  const handleButtonClick = (event) => {

    if(active === false){
        window.clearInterval(Timer)
        setActive(prev => !prev)
    }

    else {
      console.log('button click position', position.x , position.y)
      manualInputRef.current.style.display = 'none'
      let slope = Math.atan2(position.y, position.x)
      slope = (slope>0) ? slope : slope+(2*Math.PI)
      let slopeY = slope + (Math.PI/2)
      console.log('slope: ', slope)

      const beginTime = Math.floor((1800*slopeY)/Math.PI)
      let timeRemaining = beginTime
      timeRemaining = (timeRemaining>3600) ? (timeRemaining-3600) : timeRemaining
      setDisplayTime(timeRemaining)
      // setTimeRemaining(beginTime)
      console.log('begin time: ', beginTime)
      Timer = setInterval(()=>{
        console.log(timeRemaining)
        timeRemaining = timeRemaining -1
        // setTimeRemaining(prev => prev-1)
        setDisplayTime(timeRemaining)
        let angleY = (Math.PI*timeRemaining)/1800
        let angle = angleY - (Math.PI/2)
        const updatedValue = {
            x: Math.cos(angle)*250,
            y: Math.sin(angle)*250
        }
        setPosition(updatedValue)
      }, 1000)
      setActive(prev => !prev)
    }

  }

  return (
    <div className="App">
      {/* <h1>Say Hi to React bye</h1> */}
      <input className='timer-name' type='text' value={timerName} onChange={event => setTimerName(event.target.value)} placeholder='Task Turia UI Design'/>

      <div className='container'>
      {/* <div style={{backgroundColor: 'teal', height: '100px', width: '100px', zIndex: '100', position: 'relative'}}>Hello There</div>   */}
      <svg className='svg' width='600' height='600'>
        <circle cx='300' cy='300' r='250' stroke='white' strokeWidth='10' fillOpacity='0'/>
        {/* <circle cx='300' cy='300' r='200' stroke='aqua' strokeWidth='10' fillOpacity='0'/> */}
        <path className='arc' d={`m 300 50 A 250 250, 0 ${(position.x>0) ? 0 : 1} 1 , ${300+position.x} ${300+position.y}`} stroke='green' strokeWidth='10' fillOpacity='0' />
        {(initialDisplayTime==3600) ? <circle cx='300' cy='300' r='250' stroke='green' strokeWidth='10' fillOpacity='0'/> : <circle cx='300' cy='300' r='0' stroke='white' strokeWidth='10' fillOpacity='0'/>}
      </svg>
      </div>
      <FixedPoint />
      <MovablePoint />
      {/* <Display /> */}
      {(active===true)
        ? <div className='time-display time-display-static' onClick={(event=>{manualInputRef.current.style.display = 'block'})}>{`${(Math.floor(initialDisplayTime/60)<10) ? `0${Math.floor(initialDisplayTime/60)}` : Math.floor(initialDisplayTime/60)}:${(initialDisplayTime%60<10) ? `0${initialDisplayTime%60}` : `${initialDisplayTime%60}`}`}</div>
        : <div className='time-display'>{`${(Math.floor(displayTime/60)<10) ? `0${Math.floor(displayTime/60)}` : Math.floor(displayTime/60)}:${(displayTime%60<10)? `0${displayTime%60}` : `${displayTime%60}`}`}</div>
      }
      <ManualInput manualInputRef={manualInputRef}/>
      {/* <div className='time-display'>{`${Math.floor(displayTime/60)}:${displayTime%60}`}</div> */}
      <button className='button' onClick={handleButtonClick}>{`${(active === true) ? 'Start' : 'Stop'}`}</button>
    </div>
  );
}

export default App;
