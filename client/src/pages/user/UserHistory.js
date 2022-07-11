import React from 'react'
import UserNav from '../../components/sidebar/user/UserNav'
import Header from '../../components/navbar/Header'

const UserHistory = () => {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <div className="row">
                    <div className="col-md-2 p-0">
                        <UserNav />
                    </div>
                    <div className="col-md-4 offset-md-1 p-5">
                        User History
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHistory