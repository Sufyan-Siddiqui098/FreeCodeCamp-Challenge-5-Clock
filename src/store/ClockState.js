import { createSlice } from "@reduxjs/toolkit";

export const ClockState = createSlice({
  name: "clock",
  initialState: {
    sessionLen: 25,
    breakLen: 5,
    currentTime: 25 * 60,
    play: false,
    // timerTitle: "Session",
    activeSession: true,
    activeBreak: false,
    activeAudio: false,
  },
  reducers: {
    //increase Session by 1
    incSession: (state, action) => {
      if (!state.play && state.sessionLen < 60 ) {
        state.sessionLen += 1;
        if(state.activeSession){ //if the session is active then set the time a/c to the session
            state.currentTime = state.sessionLen * 60;
        }
        console.log("increase Session ");
      }
    },
    //decrease session by 1
    decSession: (state, action) => {
      if (!state.play && state.sessionLen > 1 ) {
          state.sessionLen -= 1; // set the session

          if(state.activeSession){ // But only set the time when the session is active.
              state.currentTime = state.sessionLen * 60;
        }
      }
    },
    // increase Break by 1
    incBreak: (state, action) => {
      if (!state.play && state.breakLen < 60 ) {
        state.breakLen += 1;
        if(state.activeBreak){
            state.currentTime = state.breakLen * 60;
        }
      }
    },
    //decrease Break by 1
    decBreak: (state, action) => {
      if (!state.play && state.breakLen > 1 ) {
        state.breakLen -= 1; 
        //change the time a/c to break only break time is active.
        if(state.activeBreak){
            state.currentTime = state.breakLen * 60;
        }
      }
    },
    reset: (state, action) => {
      state.sessionLen = 25;
      state.breakLen = 5;
      state.currentTime = state.sessionLen * 60;
      // reseting
      state.play = false;
      state.activeBreak = false;   
      state.activeAudio = false;
      state.activeSession = true; 
      state.timerTitle = 'Session';
    },
    playBtn: (state, action) => {
      state.play = !state.play;
      if(state.play ===false){
        state.activeAudio = false;
      }
    },
    //Play/Pause
    playPause: (state, action) => {
    //   console.log("paly state", state.play);

      if (state.play && state.activeSession) {
        state.currentTime -= 1;
        // console.log("current time is running ..." + state.currentTime);
        if (state.currentTime < 1) {
          state.activeSession = false;
          state.activeBreak = true;
          state.activeAudio = true;
          state.currentTime = state.breakLen * 60; //if the timer reach to zero then switch to the break time.
        }
      } else if(state.play && state.activeBreak){
        state.currentTime -=1;
        if(state.currentTime === (state.breakLen * 60)-3){
            state.activeAudio = false;
            console.log("audiot active is set to false")
        }
        console.log("switch to the break time..");
        if(state.currentTime===0){
            state.activeAudio = true;
            clearInterval(action.payload)
           let a= setTimeout(() => {
                state.activeAudio = false;
            }, 1000);
            state.activeBreak = false;
            state.activeSession = true;
            console.log("break time is over .. clearing interval")
            clearTimeout(a)
        }
      }
      else {
        clearInterval(action.payload);
        console.log("Clear Interval.");
        state.activeAudio = false;
      }
    },
  },
});

export const {
  incBreak,
  decBreak,
  incSession,
  decSession,
  reset,
  playBtn,
  playPause,
} = ClockState.actions;
export default ClockState.reducer;
