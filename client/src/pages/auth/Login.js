import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/navbar/Header';

const Login = () => {

    const [email, setEmail] = useState('adnasirkbw@gmail.com');
    const [password, setPassword] = useState('hello123');
    const [loading, setLoading] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault()
    }

    const form = () => (<form onSubmit={handleLogin} >
        <input type="email" className="form-control mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button disabled={!password || !email} className="btn btn-primary m-auto w-100" ><span>Login</span></button>
    </form>)



    return (
        <>
            <Header />
            <h1 className='jumbotron bg-primary text-center pt-5 pb-5 grad'>Login</h1>

            <div className="container mt-3 col-md-4 ">
                <div className="border p-5 ">
                    {form()}
                    <div className='mt-3'>
                        <span>No account? </span>
                        <Link to='/register'>
                            <span >Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login