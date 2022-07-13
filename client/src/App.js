import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';
import Register from './pages/auth/Register'
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { getUserProfile } from './requests/user'
import UserHistory from './pages/user/UserHistory';
import Profile from './pages/user/profile/Profile';
import Dashboard from './pages/admin/Dashboard';




const App = () => {

  let { token } = JSON.parse(window.localStorage.getItem("user")) || 1

  const dispatch = useDispatch(token)
  const history = useHistory()
  const checkUser = async () => {
    try {
      const { data } = await getUserProfile(token)
      const user = data.data
      dispatch({
        type: 'LOGGED_IN',
        payload: { token, ...user }
      })
    } catch (err) {
      history.push('/login')
    }
  }
  useEffect(() => {
    checkUser(token)
  }, [token])

  return (

    <>
      <ToastContainer position='top-center' />
      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path='/auth/password/reset/:resetToken' component={ResetPassword} />
        <AdminRoute><Route exact path='/admin/dashboard' component={Dashboard} /></AdminRoute>
        <UserRoute><Route exact path='/user/history' component={UserHistory} /></UserRoute>
        <UserRoute> <Route exact path='/user/profile' component={Profile} /></UserRoute>
        {/* <AdminRoute exact path='/admin/dashboard'><Dashboard /></AdminRoute> */}

      </Switch>

    </>
  )
}

export default App