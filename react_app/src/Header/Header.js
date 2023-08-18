import React, { useState } from 'react';
import './Header.css'
import ReactDOM from 'react-dom/client';
import userContext from '../UserContext';
import { Modal, Input, notification } from 'antd';
import { initialRegisteringValue } from '../Constants/pharmacy.constant';
import cartIcon from './cart-shopping-solid.svg'
import {
    UserOutlined,
    HomeFilled
} from '@ant-design/icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [api, contextHolder] = notification.useNotification();
    const [isSignUpModelVisible, setSignUpModelVisible] = useState(false);
    const [isSigninModelVisible, setSigninModelVisible] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [registeringUser, setRegisteringUser] = useState(initialRegisteringValue)
    const values = useContext(userContext);
    const { user, setUser } = values;
    const navOnclick = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
    const validateSignUpForm = () => {
        const errMg = []
        if (registeringUser.name === '' || /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g.test(registeringUser.name)) {
            errMg.push('Invalid name');
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registeringUser.email)) {
            errMg.push('Invalid email address');
        }
        else if (registeringUser.address === '') {
            errMg.push('Invalid address');
        }
        else if (registeringUser.mobile.length !== 10) {
            errMg.push('Invalid mobile number');
        }
        else if (registeringUser.password === '') {
            errMg.push('Invalid password');
        }
        return errMg;
    }
    const onSubmitSignUpPage = () => {
        const errMsg = validateSignUpForm();
        const description = errMsg.map((ele) => {
            return <div>{ele}</div>
        })
        if (errMsg.length !== 0) {
            api.info({
                message: `Info`,
                description: description,
                placement: 'bottom',
            });
        }
        else {
            localStorage.setItem('registeredUser', JSON.stringify(registeringUser));
            setSignUpModelVisible(false)
            api.info({
                message: `Success`,
                description: 'Successfully registered',
                placement: 'bottom',
            });
        }
    }
    const onSubmitSigninPage = () => {
        const registered = JSON.parse(localStorage.getItem('registeredUser'));
        if(mobileNumber === registered.mobile && password === registered.password){
            setUser(registered);
            api.info({
                message: `Success`,
                description: 'Successfully loged in',
                placement: 'bottom',
            });
            setSigninModelVisible(false);
        }
        else{
            api.info({
                message: `Error`,
                description: 'Mobile number or Password Incorrect',
                placement: 'bottom',
            });
        }
    }
    return (
        <div className='headerBody'>
            {contextHolder}
            <div className="title">
                <img src='https://mpshahhosp.org/wp-content/uploads/2022/03/Delivery-PNG-HD-Image.png' className="headerImage" />
                <h1 className='pharmacyHeading'>India Pharmacy</h1>
                <Link to='/cart' ><img className='cartIcon' src={cartIcon} />My cart</Link>
            </div>
            <div className='headerNavList'>
                <ul>
                    <li onClick={() => navOnclick('homeSection')}>Home</li>
                    <li onClick={() => navOnclick('footerSection')}>About</li>
                    <li onClick={() => navOnclick('footerSection')}>Contact</li>
                    {Object.keys(user).length ===0 && (<li onClick={() => { setSignUpModelVisible(true) }}>Sign up</li>)}
                    {Object.keys(user).length ===0 && (<li onClick={() => { setSigninModelVisible(true) }}>Sign in</li>)}
                </ul>
                {Object.keys(user).length !==0 && (<div className='userProfileSection'>
                    <div><HomeFilled />{user.address}</div>
                    <div><UserOutlined />{user.name}</div>
                </div>)}
            </div>
            {isSignUpModelVisible && (<Modal
                title="Sign Up"
                okText="Submit"
                onCancel={() => {
                    setRegisteringUser(initialRegisteringValue);
                    setSignUpModelVisible(false);
                }}
                onOk={onSubmitSignUpPage}
                maskClosable
                open={isSignUpModelVisible}
            >
                <div className='signUpModalContent'>
                    <Input placeholder='Name' value={registeringUser.name} onChange={(e) => { setRegisteringUser({ ...registeringUser, name: e.target.value.trim() }) }} />
                    <Input type='number' onWheel={(e) => e.target.blur()} placeholder='Mobile' value={registeringUser.mobile} onChange={(e) => { if (e.target.value.length !== 0 && e.target.value.length < 11) setRegisteringUser({ ...registeringUser, mobile: e.target.value.trim() }) }} />
                    <Input value={registeringUser.email} placeholder='Email' onChange={(e) => { setRegisteringUser({ ...registeringUser, email: e.target.value.trim() }) }} />
                    <Input value={registeringUser.address} placeholder='Address' onChange={(e) => { setRegisteringUser({ ...registeringUser, address: e.target.value.trim() }) }} />
                    <Input value={registeringUser.password} placeholder='Create Password' onChange={(e) => { setRegisteringUser({ ...registeringUser, password: e.target.value.trim() }) }} />
                </div>
            </Modal>)}
            {isSigninModelVisible && (
                <Modal
                    title="Sign In"
                    okText="Log In"
                    onCancel={() => {
                        setSigninModelVisible(false);
                    }}
                    onOk={onSubmitSigninPage}
                    maskClosable
                    open={isSigninModelVisible}
                >
                    <div className='signInContainer'>
                        <Input type='number'  onWheel={(e) => e.target.blur()} placeholder='Mobile Number' value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} />
                        <Input value={password} placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                </Modal>
            )}
        </div>
    );
}
export default Header;