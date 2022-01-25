import { useSelector, useDispatch } from 'react-redux'

export const useTimers = _ => {
  const dispatch = useDispatch()
  const timers = useSelector(state => state.timers)
  const setTimers = payload => dispatch({ type: 'SET_TIMERS', payload })

  return [timers, setTimers]
}
