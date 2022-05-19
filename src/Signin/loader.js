import React from 'react'
import { BeatLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className='loadingbar'>
                <BeatLoader loading color='#193566' />
        </div>
    )
}

export default Loader