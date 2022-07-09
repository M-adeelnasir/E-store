import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Register from './pages/auth/Register'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
  return (

    <>
      <ToastContainer position='top-center' />
      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />


      </Switch>

    </>
  )
}

export default App