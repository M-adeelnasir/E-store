import React from 'react'
import './sidebar.scss'
import { Link } from 'react-router-dom'
import { UserOutlined, LineChartOutlined, CreditCardOutlined, UserAddOutlined, LogoutOutlined, MinusSquareOutlined, SubnodeOutlined, PlusSquareOutlined, ApartmentOutlined, UsergroupAddOutlined, AppstoreOutlined, TableOutlined, DollarCircleOutlined, DeliveredProcedureOutlined } from '@ant-design/icons'

const AdminNav = () => {
    return (
        <>

            <div className="sidebar">
                <div className="top">
                    <span className='logo text-primary'>E-Buy</span>
                </div>
                <hr className='hr' />
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <li >
                            <AppstoreOutlined className='icon' />
                            <Link to='/' className='un'>Dashboard</Link>
                        </li>
                        <p className="title">LISTS</p>

                        <li >
                            <ApartmentOutlined className='icon' />
                            <span>Products</span>
                        </li>
                        <li >
                            <PlusSquareOutlined className='icon' />
                            <span>New Product</span>
                        </li>
                        <li >
                            <TableOutlined className='icon' />
                            <span>Category</span>
                        </li>
                        <li >
                            <SubnodeOutlined className='icon' />
                            <span>Sub Category</span>
                        </li>
                        <li >
                            <CreditCardOutlined className='icon' />
                            <span>Orders</span>
                        </li>
                        <li >
                            <MinusSquareOutlined className='icon' />
                            <span>Coupon</span>
                        </li>

                        <p className="title">USEFULL</p>
                        <li >
                            <UsergroupAddOutlined className='icon' />
                            <Link to='/users' className='un'>Users</Link>
                        </li>
                        <li >
                            <DeliveredProcedureOutlined className='icon' />
                            <span>Delivery</span>
                        </li>
                        <li >
                            <DollarCircleOutlined className='icon' />
                            <span>Orders</span>
                        </li>
                        <li >
                            <LineChartOutlined className='icon' />
                            <span>Stats</span>
                        </li>

                        <p className="title">USER</p>
                        <li >
                            <UserOutlined className='icon' />
                            <span>Profile</span>
                        </li>
                        <li >
                            < UserAddOutlined className='icon' />
                            <Link to='/new' className="un">Add User</Link>
                        </li>
                        <li >
                            <LogoutOutlined className='icon' />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

                <div className="bottom">
                    <div className="colorOption"></div>
                    <div className="colorOption"></div>
                </div>
            </div>
        </>
    )
}

export default AdminNav