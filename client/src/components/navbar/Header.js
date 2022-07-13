import React, { useState, useEffect } from 'react'
import { Menu, Badge } from 'antd';
import { toast } from 'react-toastify'
import { logoutUser } from '../../requests/user';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('home')
    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key)
    }

    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((state) => ({ ...state }))



    const handleLogout = async () => {

        try {
            history.push('/login')
            dispatch({
                type: 'LOGGED_OUT',
                payload: null
            })

            window.localStorage.removeItem('user')
            await logoutUser()
        } catch (err) {
            toast("Log out failed")
        }

    }


    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="home" >
                    <i className="fa fa-home pr-1">
                    </i> <Link to='/'>Home</Link>
                </Menu.Item>

                <Menu.Item key="cart" >
                    <i className="fa fa-cart-arrow-down pr-1">
                    </i>

                    <Badge offset={[9, 0]}>
                        <Link to='/cart'>Cart</Link>
                    </Badge>
                </Menu.Item>


                <Menu.Item key="shop" >
                    <i className="fa fa-shopping-basket pr-1">
                    </i> <Link to='/shop'>Shop</Link>
                </Menu.Item>
                {user && <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Me" >

                    {user && user.role === "user" && <Menu.Item> <i className="fa fa-th-large"></i><Link to='/user/history'>Dashboard</Link>
                    </Menu.Item>}
                    {user && user.role === "admin" && <Menu.Item> <i className="fa fa-th-large"></i><Link to='/admin/dashboard'>Dashboard</Link>
                    </Menu.Item>}

                    <Menu.Item onClick={handleLogout}><i className="fa fa-sign-in pr-2 "></i>Logout</Menu.Item>

                </SubMenu>}

                {
                    !user && <>
                        {!user && (<Menu.Item key="register" className='flr'>
                            <i className="fa fa-user-plus pr-1 "></i>
                            <Link to='/register'>Register</Link>
                        </Menu.Item>)}


                        {!user && <Menu.Item key="login" className='flr' >

                            <i className="fa fa-sign-in pr-2 "></i>
                            <Link to='/login'>Login</Link>
                        </Menu.Item>}
                    </>
                }

            </Menu>
        </>
    )
}

export default Header