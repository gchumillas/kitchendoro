import { createStore } from 'redux'

const initState = {
  timers: []
}

const reducer = (state = initState, action) => {
  if (action.type == 'SET_TIMERS') {
    return {
      ...state,
      timers: action.timers
    }
  }

  return state
}

export default createStore(reducer, initState)
