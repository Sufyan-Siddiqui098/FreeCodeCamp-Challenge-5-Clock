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
        //-----if the session is active then set the time a/c to the session
        if(state.activeSession){  
            state.currentTime = state.sessionLen * 60;
        }
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

      if (state.play && (state.activeSession || state.activeBreak)) {
        state.currentTime -= 1;             //If play then decrease it by one

        //--------if timer less than 1 then it should switch to the break time
        if (state.currentTime < 0 && state.activeSession) {         
          state.activeAudio = true;
          state.activeSession = false;
          state.activeBreak = true;
        //-----if the timer reach to zero then switch to the break time.
          state.currentTime = state.breakLen * 60; 
        }
        //----IF the break time is the Current-time and Current-time is less than 0
        if(state.currentTime < 0 && state.activeBreak){
          state.activeBreak = false;
          state.activeAudio = true;
          state.activeSession = true;
          //reseting to session length
          state.currentTime = state.sessionLen * 60;
          state.activeAudio = false;
        }
      } 
    
      else {
        clearInterval(action.payload);
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
