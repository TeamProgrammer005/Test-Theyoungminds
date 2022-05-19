import React, { useState } from 'react'
import verifImg from "../image/signupverification.png"
import "./signin.css"
import { useForm } from 'react-hook-form';
import { BsPerson, BsTelephone } from "react-icons/bs";
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import axios from 'axios';

const Signupverification = () => {
    const history = useHistory()
    const location = useLocation();
    const { register, handleSubmit, errors } = useForm();
    const [authenticationTypeEmail, setauthenticationTypeEmail] = useState("isemail");
    const [authenticationTypePhone, setauthenticationTypePhone] = useState("isnotphone");
    const onEmailSubmit = async (data, e) => {
        e.preventDefault();
        const userData = location.state.user
        try {
            console.log(userData)
            const config = { headers: { 'Content-Type': 'application/json' } }
            const resp = await axios.post('https://node-app-ym.herokuapp.com/user/emailverify', userData, config)
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
    };
    const onPhoneSubmit = () => {
        history.push("/otpverification")
    }
    function changeauthtype() {
        if (authenticationTypeEmail === "isemail") {
            setauthenticationTypeEmail("isnotemail")
            setauthenticationTypePhone("isphone")
        } else {
            setauthenticationTypeEmail("isemail")
            setauthenticationTypePhone("isnotphone")
        }
    }
    return (
        <div className='registrationwrapper'>
            <div className='signinform'>
                <img style={{ marginTop: "10%" }} src={verifImg}></img>
                <div className='signintext'>AUTHENTICATION</div>
                <div className='forgetpasswordtext' style={{ marginBottom: "5%",display:"none" }}>Choose a convenient option for authentication.</div>
                <div style={{ marginBottom: "10%",width:"70%" }} className='row authtype'>
                    <div onClick={changeauthtype} className={`col ${authenticationTypeEmail}`}>Email</div>
                    {/*<div onClick={changeauthtype} className={`col ${authenticationTypePhone}`}>Phone Number</div>*/}
                </div>
                {
                    authenticationTypeEmail === "isemail" ?
                        <form onSubmit={handleSubmit(onEmailSubmit)}>
                            <div style={{ marginBottom: "10%" }}>
                                <div className='inputtext'>
                                    <BsPerson color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                    <input
                                        value={location.state.user.email}
                                        readOnly="true"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <button type='submit' className='submitbutton'>Submit</button>
                        </form> :
                        {/*<form onSubmit={handleSubmit(onPhoneSubmit)}>
                            <div style={{ marginBottom: "10%" }}>
                                <div className='inputtext'>
                                    <BsTelephone color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                                    <input
                                        type="tell"
                                        name="phone"
                                        value={location.state.user.phoneNumber}
                                        readOnly="true"
                                    />
                                </div>
                            </div>
                            <button type='submit' className='submitbutton'>Submit</button>
                </form>*/}
                }
            </div>
        </div>
    )
}

export default Signupverification
