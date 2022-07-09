import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../../components/navbar/Header';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Register = () => {
    const [email, setEmail] = useState('adeelnasirkbw@gmail.com');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = (e) => {
        e.preventDefault();


    }


    const form = () => <form onSubmit={handleRegister} >
        <input type="email" className="form-control mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" className="form-control mb-4" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button disabled={!email} className="btn btn-primary m-auto w-100" type="submit">Register</button>
    </form>


    return (
        <>
            <Header />
            <h1 className='jumbotron bg-primary text-center pt-5 pb-5 grad'>Register</h1>

            <div className="container mt-3 col-md-4 ">
                <div className="border p-5 ">
                    {form()}
                    <div className='mt-3'>
                        <Link to='/login'>
                            <span >Already have an Account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register