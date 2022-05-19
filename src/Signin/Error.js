import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error = () => {
    const notify = () => {
        toast("Wow so easy!");
    }
    return (
        <div>
            <div>
                <button onClick={notify}>Notify!</button>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Error