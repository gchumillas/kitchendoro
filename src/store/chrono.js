import { useSelector, useDispatch } from 'react-redux'

export const useChrono = _ => {
  const dispatch = useDispatch()
  const chrono = useSelector(state => state.chrono)
  const setChrono = payload => dispatch({ type: 'SET_CHRONO', payload })

  return [chrono, setChrono]
}
