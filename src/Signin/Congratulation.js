import React from 'react'
import congratulation from "../image/congratulation.png"
import "./signin.css"
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

const Congratulation = () => {
    const [verified, setverified] = useState(true);
    const history = useHistory();
    const { id, token } = useParams();
    useEffect(async () => {
        try {
            const resp = await axios.get(`https://node-app-ym.herokuapp.com/user/${id}/verify/${token}`);
            console.log(resp)
            if (resp.data) {
                setverified(true)
            }
        }
        catch (err) {
            setverified(false)
        }
    })
    const { handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        history.push("/dashboard")
    };
    if (verified) {
        return (
            <div className='registrationwrapper'>
                <div className='signinform'>
                    <img style={{ marginTop: "10%" }} src={congratulation}></img>
                    <div style={{ textAlign: "center" }} className='signintext'>CONGRATULATIONS! </div>
                    <div style={{ textAlign: "center" }} className='forgetpasswordtext' style={{ marginBottom: "15%" }}>You are now a member of YOUNG MIND EDUCATION.</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <button type='submit' className='submitbutton mb-3'>Go To Dashboard</button>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>Verification failed</div>
        )
    }
}

export default Congratulation;
