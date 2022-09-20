import { UseAuthContext } from './UseAuthContext'


export const UseLogout = () => {
  const { dispatch } = UseAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    // dispatch workouts to null

  }

  return { logout }
}