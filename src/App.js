import { useDispatch, useSelector } from "react-redux";
import { incBreak, decBreak, incSession, decSession, playPause, reset, playBtn } from "./store/ClockState";
import { useRef } from "react";
// import { useState, useEffect } from "react";


function App() {
  const {breakLen, sessionLen, currentTime, activeSession, activeAudio} = useSelector((state)=>state.clock)
  const dispatch = useDispatch()
  const audioRef = useRef(null)
  let timerTitle;

  if(activeAudio){
    audioRef.current.play()
  }

  const startTimer = () => {
    dispatch(playBtn())
    let intervalId = setInterval(()=>{
      dispatch(playPause(intervalId)) 
    },1000)
  }


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes<10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  if(activeSession){
    timerTitle = 'Session'
  } else{
    timerTitle = 'Break'
  }
  return (
    
      <div className="container">
        <h1>25 + 5 Clock</h1>
        <div className="grid">
          {/* SESSIONS */}
          <div className="left">
            <h4 id="break-label" >Break Length</h4>
            <div className="flex">
              <i className="fa-solid fa-arrow-down" id="break-decrement" onClick={()=>dispatch(decBreak())}></i>
              <p id="break-length">{breakLen}</p>
              <i className="fa-solid fa-arrow-up" id="break-increment" onClick={()=>dispatch(incBreak())} ></i>
            </div>
          </div>

          <div className="right">
            <h4 id="session-label">Session Length</h4>
            <div className="flex">
              <i className="fa-solid fa-arrow-down" id="session-decrement" onClick={()=>dispatch(decSession())} ></i>
              <p id="session-length">{sessionLen}</p>
              <i className="fa-solid fa-arrow-up" id="session-increment" onClick={()=>dispatch(incSession())} ></i>
            </div>
          </div>
        </div>

        <div className={`clock-container ${currentTime<60?"red":""}`} >
          <h4 id="timer-label">{timerTitle}</h4>
          <h2 id="time-left">{formatTime(currentTime)}</h2>
        </div>

        <div className="operation">
          <div id="start_stop" onClick={startTimer} >
            <img src="https://icon-library.com/images/play-pause-icon/play-pause-icon-17.jpg" alt="play/pause" />
          </div>
          <div id="reset" onClick={()=> {audioRef.current.pause();audioRef.current.currentTime=0;dispatch(reset())}} >
            <img src="https://icons-for-free.com/iconfiles/png/512/refresh-131964784961013457.png" alt="reset" />
          </div>
        </div>
        <audio ref={audioRef} id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"   ></audio>
        <div className="author">
          <p>Develope by <strong>Sufyan Siddiqui</strong></p>
        </div>
      </div>
      
  );
}

export default App;
