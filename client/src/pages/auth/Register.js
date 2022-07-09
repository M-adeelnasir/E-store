import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../../components/navbar/Header';
import { toast } from 'react-toastify';
import { register } from '../../requests/user';


const Register = () => {
    const [error, setError] = useState('')
    const [showhide, setShowhide] = useState(false)
    const [loading, setLoding] = useState(false)

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
        setLoding(true)
        try {
            const { data } = await register(name, email, password)
            toast("Register Succesfull")
            setLoding(false)
            setShowhide(false)
            setValues({ ...values, name: "", password: "", email: "", confirmPassword: "" })
        } catch (err) {
            setLoding(false)
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

        <button disabled={!email || !password || !confirmPassword} className="btn btn-primary m-auto w-100" type="submit">{loading ? <div class="spinner-border spinner-border-sm" > </div> : <span>Register</span>}</button>
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