import React, { useState } from 'react'
import signinimage from "../image/signin.png"
import "./signin.css"
import { useForm } from 'react-hook-form';
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri"
import google from "../image/google.png"
import { BsFacebook, BsTwitter, BsApple } from "react-icons/bs"
import { FaLinkedinIn } from "react-icons/fa"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Loader from './loader';
import {IoIosArrowBack} from "react-icons/io"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory()
    const [isloading, setisloading] = useState(false)
    const goToForgetPassword = () => {
        history.push("/forgetpassword")
    }
    const onSubmit = async (data) => {
        setisloading(true)
        console.log(data);
        try {
            const config = { headers: { 'Content-Type': 'application/json' } }
            const loginres = await axios.post("https://node-app-ym.herokuapp.com/user/login", data, config)
            if (loginres.data) {
                console.log(loginres.data)
                localStorage.setItem("auth-token", loginres.data.token);
                history.push("/home")
            }
            setisloading(false)
        } catch (error) {
            showWarning(error.response.data.msg)
            alert(error.response.data.msg)
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
                    <img src={signinimage}></img>
                    <div className='signintext'>SIGN IN</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ marginBottom: "14%" }}>
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
                                <span onClick={goToForgetPassword} style={{ position: "absolute", right: "13%", color: "rgba(25, 53, 102, 1)" }}>Forget?</span>
                            </div>
                            {errors.password && (
                                <p className="errorMsg">{errors.password.message}</p>
                            )}
                        </div>
                        <button type='submit' className='submitbutton'>Sign In</button>
                    </form>
                    <div className='othersignintext'>Or Sign in with</div>
                    <div className='socialmedialinks'>
                        <div className='googleicon'><img src={google} sizes='1rem' /><span className='google'>Google</span></div>
                        <div className='icon'><BsFacebook /></div>
                        <div className='icon'><BsTwitter /></div>
                        <div className='icon'><FaLinkedinIn /></div>
                        <div className='icon'><BsApple /></div>
                    </div>
                    <div className='footertext pb-4'>New to Young Mind Education?<span className='signuptext' onClick={()=>{history.push("/signup")}}>Sign Up</span></div>
                </div>
                <ToastContainer />
            </div>
        )
    }
    else {
        return (
            <div>
                <Loader />
            </div>
        )
    }
}

export default Signin
