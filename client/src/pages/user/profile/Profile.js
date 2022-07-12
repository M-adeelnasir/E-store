import React, { useState, useEffect } from 'react'
import './new.scss'
import UserNav from '../../../components/sidebar/user/UserNav'
import Header from '../../../components/navbar/Header'
import { CloudUploadOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { getUserProfile } from '../../../requests/user'
import { useSelector } from 'react-redux'


const Profile = () => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [hidden, setHidden] = useState(true)

    let { token } = JSON.parse(window.localStorage.getItem("user")) || 1





    const getUser = async (token) => {
        try {
            const { data } = await getUserProfile(token)
            const { data: user } = data
            console.log(user);

            setName(user.name)
            setPassword(user.password)
            setEmail(user.email)
            setAddress(user.address || "")
            setPhone(user.phone || "")
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (token) {
            getUser(token)
        }
    }, [token])


    return (
        <div className="new">
            <UserNav />
            <div className="newContainer">
                <Header />
                <div className="top">
                    <h3>Update Profile</h3>
                </div>
                <div className="center">
                    <div className="left">
                        <img src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-20.jpg" alt="sdklsk" />
                    </div>

                    <div className="right">
                        <form action="">
                            <div className="formInput">
                                <label htmlFor='img'>Image: <CloudUploadOutlined style={{ width: '40px', hight: "40px", cursor: 'pointer' }} /></label>
                                <input type="file" id='img' style={{ display: "none" }} />
                            </div>
                            <div className="formInput">
                                <label >Name</label>
                                <input type="text" placeholder='Adeel Nasir' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="formInput">
                                <label >Eamil</label>
                                <input type="email" placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="formInput">
                                <label >Phone</label>
                                <input type="text" placeholder='Your Contact Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="pswd">
                                <label >Password</label>
                                <div className="input">
                                    <input type={hidden ? "password" : "text"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {hidden && < EyeInvisibleOutlined className='icon' onClick={() => setHidden(!hidden)} />}

                                    {!hidden && <EyeOutlined className='icon' onClick={() => setHidden(!hidden)} />}
                                </div>

                            </div>
                            <div className="formInput">
                                <label >address</label>
                                <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="btn btn-primary btn-block w-50 ">
                                Update Profile
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile