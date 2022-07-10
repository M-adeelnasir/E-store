import React, { useState, useEffect } from 'react'
import Header from '../../components/navbar/Header';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { resetPassword } from '../../requests/user';
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showhide, setShowhide] = useState(false)
    const [success, setSuccess] = useState(false)

    const { resetToken } = useParams();


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await resetPassword(password, confirmPassword, resetToken)
            toast(data.msg)
            setLoading(false)
            setSuccess(true)
            setConfirmPassword('')
            setPassword("")
        } catch (err) {

            setError(err.response.data.msg)
            setLoading(false)
        }
    }



    const form = () => (<form onSubmit={handleLogin} >

        <input type={showhide ? "text" : "password"} className="form-control mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type={showhide ? "text" : "password"} className="form-control mb-2" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => setShowhide(!showhide)} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password
            </label>
        </div>
        {error && <div className="text-danger mt-0 mb-2" >{error}</div>}

        <button disabled={!confirmPassword || !password} className="btn btn-primary m-auto w-100" type="submit">{loading ? <div className="spinner-border spinner-border-sm" > </div> : <span>Reset Password</span>}</button>

    </form>)
    return (
        <>
            <Header />
            <div className="container col-md-4 mt-5">
                <h3 className='text-info'>Reset Your Password</h3>
                {form()}
                {success && <div className='mt-3' style={{ textDecoration: 'underline' }}>
                    <Link to='/login'>
                        <span >Login Now</span>
                    </Link>
                </div>}
            </div>
        </>
    )
}

export default ResetPassword