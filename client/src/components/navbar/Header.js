import React, { useState } from 'react'
import { Menu, Badge } from 'antd';
import { Link } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('home')
    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key)
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
                {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title="title">

                 
                </SubMenu> */}
                <Menu.Item key="register" className='flr'>
                    <i className="fa fa-user-plus pr-1 "></i>
                    <Link to='/register'>Register</Link>
                </Menu.Item>

                <Menu.Item key="login" className='flr' >

                    <i className="fa fa-sign-in pr-2 "></i>
                    <Link to='/login'>Login</Link>
                </Menu.Item>

            </Menu>
        </>
    )
}

export default Header