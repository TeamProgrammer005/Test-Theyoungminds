import React, { useState } from 'react'
import resetpassword from "../image/resetpassword.png"
import "./signin.css"
import { useForm } from 'react-hook-form';
import { RiLockPasswordLine } from "react-icons/ri"
import { useParams, useHistory } from "react-router-dom"
import axios from 'axios';
import {IoIosArrowBack} from "react-icons/io"



const ResetPassword = () => {
    const { id, token } = useParams();
    const history = useHistory();
    const [matchPassword, setmatchPassword] = useState("")
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (userData) => {
        if (userData.password !== userData.confirmpassword) {
            setmatchPassword("Password is not same as Confirm Password")
        }
        else {
            userData = {
                ...userData,
                "token": token,
                "id": id
            }
            try {
                console.log(userData)
                const config = { headers: { 'Content-Type': 'application/json' } }
                const resp = await axios.post('https://node-app-ym.herokuapp.com/user/newpassword', userData, config)
                console.log(resp)
                if (resp.data) {
                    localStorage.setItem("auth-token", resp.data.token);
                    history.push({
                        pathname: '/dashboardhome'
                    });
                }
            }
            catch (err) {
                alert(err.response.data.msg)
            }
        }
    };
    return (
        <div className='registrationwrapper'>
            <div className='signupbackbtn' onClick={()=>{history.goBack()}}>
                    <IoIosArrowBack color='#193566'/>
                </div>
            <div className='signinform'>
                <img style={{ marginTop: "10%", marginBottom: "10%" }} src={resetpassword}></img>
                <div style={{ marginBottom: "15%" }} className='signintext'>RESET PASSWORD</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: "10%" }}>
                        <div className='inputtext'>
                            <RiLockPasswordLine color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                            <input
                                type="password"
                                placeholder='New Password'
                                name='password'
                                ref={register({
                                    required: 'Password is required.'
                                })}
                                className={`${errors.password ? 'input-error' : ''}`} /><br />
                        </div>
                        {errors.password && (
                            <p className="errorMsg">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <div className='inputtext'>
                            <RiLockPasswordLine color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                name='confirmpassword'
                                ref={register({
                                    required: 'Confirm Password is required.'
                                })}
                                className={`${errors.confirmpassword ? 'input-error' : ''}`} /><br />
                        </div>
                        {errors.confirmpassword && (
                            <p className="errorMsg">{errors.confirmpassword.message}</p>
                        )}
                    </div>
                    <p className='matchpassword'>{matchPassword}</p>
                    <button type='submit' className='submitbutton mb-3'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
