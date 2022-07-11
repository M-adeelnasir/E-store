import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'
import { UserOutlined, LogoutOutlined, EyeOutlined, DeliveredProcedureOutlined, ShoppingOutlined, HistoryOutlined } from '@ant-design/icons'

const UserNav = () => {
    return (
        <>
            <div className="sidebar">
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <li >
                            <HistoryOutlined className='icon' />
                            <Link to='/' className='un'>History</Link>
                        </li>
                        <p className="title">LISTS</p>
                        <li >
                            <ShoppingOutlined className='icon' />
                            <span>Orders</span>
                        </li>
                        <p className="title">USEFULL</p>
                        <li >
                            <DeliveredProcedureOutlined className='icon' />
                            <span>Delivery</span>
                        </li>

                        <p className="title">USER</p>
                        <li >
                            <EyeOutlined className='icon' />
                            <Link to='/user/profile'><span>Update Profile</span></Link>

                        </li>
                        <li >
                            <UserOutlined className='icon' />
                            <Link to='/new' className="un">User</Link>
                        </li>
                        <li >
                            <LogoutOutlined className='icon' />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default UserNav