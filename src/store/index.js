import { createStore } from 'redux'

const initState = {
  timers: [],
  chrono: {
    startFrom: 0,
    endTo: 0,
    running: false,
    started: false
  }
}

const reducer = (state = initState, action) => {
  if (action.type == 'SET_TIMERS') {
    return {
      ...state,
      timers: action.payload
    }
  } else if (action.type == 'SET_CHRONO') {
    return {
      ...state,
      chrono: action.payload
    }
  }

  return state
}

export default createStore(reducer, initState)
