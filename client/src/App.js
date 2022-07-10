import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Register from './pages/auth/Register'
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { currentUser } from './requests/user'



const App = () => {


  let { token } = JSON.parse(window.localStorage.getItem("user")) || 1

  const dispatch = useDispatch()
  const history = useHistory()
  const checkUser = async (token) => {
    try {
      const { data } = await currentUser(token)
      const user = data.data
      dispatch({
        type: 'LOGGED_IN',
        payload: user
      })
    } catch (err) {
      history.push('/login')
    }
  }

  useEffect(() => {
    checkUser(token)
  }, [])

  return (

    <>
      <ToastContainer position='top-center' />
      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:resetToken' component={ResetPassword} />


      </Switch>

    </>
  )
}

export default App