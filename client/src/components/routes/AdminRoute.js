import React, { useEffect, useState } from 'react'
import { currentAdmin } from '../../requests/user'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import LoadingRedirect from './LoadingRedirect'

const AdminRoute = ({ children, ...rest }) => {
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))


    const current = async (token) => {
        try {
            const { data } = await currentAdmin(token)
            console.log("CURRENT ADMIN", data);
            setOk(true)
        } catch (err) {
            console.log("CURRENT ADMIN ERROR", err);
            setOk(false)
        }
    }

    useEffect(() => {
        if (user && user !== null && user.token) {
            console.log(user);
            current(user.token)
        }
    }, [user])

    return (
        <>
            {!ok ? (
                <Route {...rest} render={() => children} />
            ) : <LoadingRedirect />}
        </>
    )
}

export default AdminRoute