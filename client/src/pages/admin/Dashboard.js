import React from 'react'
import Header from '../../components/navbar/Header'
import AdminNav from '../../components/sidebar/admin/AdminNav'

const Dashboard = () => {
    return (
        <>
            <div className="conatiner-fluid">

                <div className="row ">
                    <div className="col-md-2 d-flex p-0">
                        <AdminNav />
                    </div>
                    <div className="col-md-10 p-0">
                        <Header />

                        Dashboard
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard