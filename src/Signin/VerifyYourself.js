import React from 'react'
import verifyyourself from "../image/verifyyourself.png"
import "./signin.css"
import { useForm } from 'react-hook-form';

const VerifyYourself = () => {
    const { handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        
    };
    return (
        <div className='registrationwrapper'>
            <div className='signinform'>
                <img style={{ marginTop: "10%" }} src={verifyyourself}></img>
                <div className='signintext'>VERIFY YOURSELF </div>
                <div className='forgetpasswordtext' style={{ marginBottom: "15%" }}>A Verification mail has been sent to your registered email.Please check your inbox.</div>
                <div>
                    <a href='https://mail.google.com/' className='submitbutton coloradded'>Submit</a>
                </div>
            </div>
        </div>
    )
}

export default VerifyYourself;
