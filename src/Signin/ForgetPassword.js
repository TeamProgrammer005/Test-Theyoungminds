import React, { useState } from 'react'
import forgetpassword from "../image/forgetpassword.png"
import "./signin.css"
import { BsPerson, BsTelephone } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {IoIosArrowBack} from "react-icons/io"

const ForgetPassword = () => {
    const history = useHistory();
    function changeauthtype() {
        if (authenticationTypeEmail === "isemail") {
            setauthenticationTypeEmail("isnotemail")
            setauthenticationTypePhone("isphone")
        } else {
            setauthenticationTypeEmail("isemail")
            setauthenticationTypePhone("isnotphone")
        }
    }
    const [authenticationTypeEmail, setauthenticationTypeEmail] = useState("isemail");
    const [authenticationTypePhone, setauthenticationTypePhone] = useState("isnotphone");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState(91);
    const onEmailClick = async (e) => {
        e.preventDefault();
        const userData = { "email": email }
        console.log(userData)
        try {
            console.log(userData)
            const config = { headers: { 'Content-Type': 'application/json' } }
            const resp = await axios.post('https://node-app-ym.herokuapp.com/user/resetpassword', userData, config)
            console.log(resp)
            if (resp.data) {
                history.push({
                    pathname: '/verifyyourself'
                });
            }
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }
    function onPhoneClick() {
        //console.log(phoneNumber)
    }
    return (
        <div className='registrationwrapper'>
            <div className='signupbackbtn' onClick={()=>{history.goBack()}}>
                <IoIosArrowBack color='#193566'/>
            </div>
            <div className='signinform'>
                <img style={{ marginTop: "10%" }} src={forgetpassword}></img>
                <div className='signintext'>FORGOT PASSWORD?</div>
                <div className='forgetpasswordtext' style={{ marginBottom: "15%" }}>Don't worry! It happens.Please enter the adress associated with your Account.</div>
                <div style={{ marginBottom: "10%" }} className='row authtype'>
                    <div onClick={changeauthtype} className={`col ${authenticationTypeEmail}`}>Email</div>
                    {/*<div onClick={changeauthtype} className={`col ${authenticationTypePhone}`}>Phone Number</div>*/}
                </div>
                {
                    authenticationTypeEmail === "isemail" ?
                        <div>
                            <div style={{ marginBottom: "10%" }}>
                                <div className='inputtext'>
                                    <BsPerson color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                    <input
                                        placeholder='Email Id'
                                        type="text"
                                        name='email'
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <button type='submit' onClick={onEmailClick} className='submitbutton'>Submit</button>
                        </div> :
                        <div>
                            <div style={{ marginBottom: "10%" }}>
                                <div className='inputtext'>
                                    <BsTelephone color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                    <input
                                        type="tell"
                                        name="phone"
                                        placeholder='Phone Number'
                                        value={phoneNumber}
                                        onChange={(e) => { setphoneNumber(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <button type='submit' onClick={onPhoneClick} className='submitbutton'>Submit</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default ForgetPassword;
