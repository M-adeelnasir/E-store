import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Spiner from '../spiner/Spiner'

const LoadingRedirect = () => {
    const [count, setCount] = useState(10)
    const history = useHistory()
    useEffect(() => {
        const intervel = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        //redirect user
        count === 0 && history.push('/login')
        return () => clearInterval(intervel)
    }, [count, history])
    return (
        <>

            <div style={{ height: '100vh', display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <Spiner />
                <p className='p-10 mt-10'>you will be redirect in {count} </p>

            </div>
        </>

    )
}

export default LoadingRedirect