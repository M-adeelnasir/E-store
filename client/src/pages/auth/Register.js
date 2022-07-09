import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../../components/navbar/Header';
import { toast } from 'react-toastify';
import { register } from '../../requests/user';


const Register = () => {
    // const [email, setEmail] = useState('adeelnasirkbw@gmail.com');
    // const [name, setName] = useState('adeel nasir');
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [showhide, setShowhide] = useState(false)

    const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    const { name, email, password, confirmPassword } = values




    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setError("")
    }


    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password does not match")
            return
        }
        try {
            const { data } = await register(name, email, password)
            toast("Register Succesfull")
            setValues({ ...values, name: "", password: "", email: "", confirmPassword: "" })
        } catch (err) {
            console.log(err.response.data.msg);
            setError(err.response.data.msg)
        }
    }



    const form = () => <form onSubmit={handleRegister} >
        <input type="text" className="form-control mb-4" placeholder="name" name='name' value={name} onChange={handleChange} />
        <input type="email" className="form-control mb-4" placeholder="Email" name='email' value={email} onChange={handleChange} />
        <input type={showhide ? "text" : "password"} className="form-control mb-4" placeholder="Password" name="password" value={password} onChange={handleChange} />

        <input type={showhide ? "text" : "password"} className="form-control mb-2" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />

        <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => setShowhide(!showhide)} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password
            </label>
        </div>

        {error && <div className="text-danger mt-0 mb-2" >{error}</div>}
        <button disabled={!email} className="btn btn-primary m-auto w-100" type="submit">Register</button>
    </form>


    return (
        <>
            <Header />
            <h1 className='jumbotron bg-primary text-center pt-4 pb-4 grad'>Register</h1>

            <div className="container mt-2 col-md-4">
                <div className="border p-5">
                    {form()}
                    <div className='mt-3'>
                        <Link to='/login'>
                            <span >Already have an Account</span>
                        </Link>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </>

    )
}

export default Register