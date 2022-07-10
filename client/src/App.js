import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Register from './pages/auth/Register'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

const App = () => {
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