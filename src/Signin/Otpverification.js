import React from 'react'
import enterotp from "../image/enterotp.png"
import "./signin.css"
import { useForm } from 'react-hook-form';
import { BsFillChatLeftTextFill } from "react-icons/bs";

const Otpverification = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className='registrationwrapper'>
            <div className='signinform'>
                <img style={{ marginTop: "10%" }} src={enterotp}></img>
                <div className='signintext'>ENTER OTP</div>
                <div className='forgetpasswordtext' style={{ marginBottom: "15%" }}>A 4 digit OTP has been sent to your registered mobile number</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: "10%" }}>
                        <div className='inputtext'>
                            <BsFillChatLeftTextFill color='rgba(151, 167, 195, 1)' style={{ position: "absolute" }} />
                            <input
                                type="number"
                                name="otp"
                                placeholder='Enter OTP'
                                autoComplete="off"
                                ref={register({
                                    required: 'OTP is required.',
                                    minLength: {
                                        value: 4,
                                        message: 'OTP is of minimum 4 digits.'
                                    },
                                    maxLength: {
                                        value: 4,
                                        message: 'OTP is of maximum 4 digits.'
                                    }
                                })}
                                className={`${errors.otp ? 'input-error' : ''}`} />
                        </div>
                        {errors.otp && (
                            <p className="errorMsg">{errors.otp.message}</p>
                        )}
                    </div>
                    <button type='submit' className='submitbutton'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Otpverification
