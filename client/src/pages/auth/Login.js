import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/navbar/Header';
import { login } from '../../requests/user';
import { toast } from 'react-toastify'

const Login = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showhide, setShowhide] = useState(false)




    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data: user } = await login(email, password)
            setLoading(false)
            setShowhide(false)
            toast("Logged In Successful")
            history.push('/')
        } catch (err) {
            setError(err.response.data.msg)
            setLoading(false)


        }

    }

    const form = () => (<form onSubmit={handleLogin} >
        <input type="email" className="form-control mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type={showhide ? "text" : "password"} className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => setShowhide(!showhide)} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password
            </label>
        </div>
        {error && <div className="text-danger mt-0 mb-2" >{error}</div>}

        <button disabled={!email || !password} className="btn btn-primary m-auto w-100" type="submit">{loading ? <div class="spinner-border spinner-border-sm" > </div> : <span>Login</span>}</button>
    </form>)



    return (
        <>
            <Header />
            <h1 className='jumbotron bg-primary text-center pt-4 pb-4 grad'>Login</h1>

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