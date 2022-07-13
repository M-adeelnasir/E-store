import React from 'react'
import UserNav from '../../components/sidebar/user/UserNav'
import Header from '../../components/navbar/Header'

const UserHistory = () => {
    return (
        <>
            <div className="container-fluid p-0">

                <div className="row ">
                    <div className="col-md-2 d-flex" style={{ padding: "0" }}>
                        <UserNav />
                    </div>
                    <div className="col-md-10 " style={{ padding: "0" }}>
                        <Header />

                        User History
                    </div>
                </div>
            </div>




        </>
    )
}

export default UserHistory