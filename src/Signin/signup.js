import React, { useState } from 'react'
import signupimage from "../image/signup.png"
import "./signin.css"
import { useForm } from 'react-hook-form';
import { BsPerson, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri"
import google from "../image/google.png"
import { BsFacebook, BsTwitter, BsApple } from "react-icons/bs"
import { FaLinkedinIn } from "react-icons/fa"
import axios from "axios"
import { useHistory, useLocation } from "react-router-dom"
import Loader from './loader';
import {IoIosArrowBack} from "react-icons/io"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit, errors } = useForm();
    const [isloading, setisloading] = useState(false)
    const onSubmit = async (newUser, e) => {
        setisloading(true)
        e.preventDefault();
        try {
            newUser = {
                ...newUser,
                usertype: location.state
            }
            console.log(newUser)
            const config = { headers: { 'Content-Type': 'application/json' } }
            const resp = await axios.post('http://localhost:4000/user/signup', newUser, config)
            if (resp.data) {
                history.push({
                    pathname: '/signupverify',
                    state: { user: newUser },
                });
            }
            setisloading(false)
        }
        catch (err) {
            /*let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            console.warn("error", message);
            if(err.response["status"]==400){
                alert(err.response.data.msg)
            }*/
            showWarning(err.response.data.msg)
            setisloading(false)
        }
    };
    const showWarning=(error)=>{
        toast.error(error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    if (isloading == false) {
        return (
            <div className='registrationwrapper'>
                <div className='signupbackbtn' onClick={()=>{history.goBack()}}>
                    <IoIosArrowBack color='#193566'/>
                </div>
                <div className='signinform'>
                    <img src={signupimage}></img>
                    <div className='signintext'>SIGN UP</div>
                    <div className='socialmedialinks'>
                        <div className='googleicon'><img src={google} sizes='1rem' /><span className='google'>Google</span></div>
                        <div className='icon'><BsFacebook /></div>
                        <div className='icon'><BsTwitter /></div>
                        <div className='icon'><FaLinkedinIn /></div>
                        <div className='icon'><BsApple /></div>
                    </div>
                    <div className='othersignintext' style={{ marginBottom: "5%" }}>Or Sign up with Email</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ marginBottom: "10%" }}>
                            <div className='inputtext'>
                                <BsPerson color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                <input
                                    type="text"
                                    placeholder='Email ID'
                                    name='email'
                                    ref={register({
                                        required: 'Email is required.',
                                        pattern: {
                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                            message: 'Email is not valid.'
                                        }
                                    })}
                                    className={`${errors.email ? 'input-error' : ''}`} /><br />
                            </div>
                            {errors.email && (
                                <p className="errorMsg">{errors.email.message}</p>
                            )}
                        </div>
                        <div style={{ marginBottom: "10%" }}>
                            <div className='inputtext'>
                                <BsTelephone color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                <input
                                    type="tell"
                                    name="phoneNumber"
                                    placeholder='Phone'
                                    autoComplete="off"
                                    ref={register({
                                        required: 'Phone Number is required.',
                                        minLength: {
                                            value: 10,
                                            message: 'Phone Number should be at-least 10 digits.'
                                        }
                                    })}
                                    className={`${errors.phoneNumber ? 'input-error' : ''}`} />
                            </div>
                            {errors.phoneNumber && (
                                <p className="errorMsg">{errors.phoneNumber.message}</p>
                            )}
                        </div>
                        <div style={{ marginBottom: "10%" }}>
                            <div className='inputtext'>
                                <RiLockPasswordLine color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    autoComplete="off"
                                    ref={register({
                                        required: 'Password is required.',
                                        minLength: {
                                            value: 6,
                                            message: 'Password should have at-least 6 characters.'
                                        }
                                    })}
                                    className={`${errors.password ? 'input-error' : ''}`} />
                            </div>
                            {errors.password && (
                                <p className="errorMsg">{errors.password.message}</p>
                            )}
                        </div>
                        <button type='submit' className='submitbutton'>Sign Up</button>
                    </form>
                    <div className='footertext pb-4'>Already a Member?<span className='signuptext' onClick={()=>history.push("/signin")}>Sign In</span></div>
                </div>
                <ToastContainer />
            </div>
        )
    } else {
        return (
            <div>
                <Loader/>
            </div>
        )
    }
}

export default Signup
