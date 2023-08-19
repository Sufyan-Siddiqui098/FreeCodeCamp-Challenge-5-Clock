import { configureStore } from "@reduxjs/toolkit";
import clockReducer from './ClockState'

const store = configureStore({
    reducer:{
        clock: clockReducer
    }
})

export default store;