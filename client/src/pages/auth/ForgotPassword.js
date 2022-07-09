import React, { useState } from 'react'
import Header from '../../components/navbar/Header'
import { forgotPassword } from '../../requests/user';
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState('adeelnasirkbw@gmail.com');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await forgotPassword(email)
            setLoading(false)
            toast(data.msg)

        } catch (err) {
            setLoading(false)
            setError(err.response.data.msg)
        }

    }

    const form = () => <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-4 mt-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <div className="text-danger mt-0 mb-2" >{error}</div>}

        <button disabled={!email} className="btn btn-primary m-auto w-100" type="submit">{loading ? <div className="spinner-border spinner-border-sm" > </div> : <span>Submit</span>}</button>
    </form>


    return (
        <>
            <Header />
            <div className="container col-md-4 mt-5">
                <h3 className='text-info'>Forgot Your Password</h3>
                {form()}
            </div>
        </>
    )
}

export default ForgotPassword