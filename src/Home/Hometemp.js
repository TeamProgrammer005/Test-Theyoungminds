import React from 'react';
import homelogo from "../image/homeymlogo2.png"
import {Link} from "react-router-dom"

const Hometemp = () => {
    return <div style={{width:"360px",margin:"auto"}}>
        <div classname="homevector" >
            <img className='homevecimg' src={homelogo} />
        </div>
        <div className='ymslogan'>
            Let's Make education equitable & accessible
        </div>
        <button className='homestartedbutton'>
            <a target={"_blank"} href='https://docs.google.com/forms/d/e/1FAIpQLSdiaFG0kbduBqkh0UWx_GmTnqjZBfIvUP9YNQ6LbLskQf8ekQ/viewform' color='white !important'>Young Leader's Program</a>
        </button>
        <div className='homebuttons'>
            <button className='homedashboardbutton2'><Link to={"/services"}>Services</Link></button>
            <button className='homesignupbutton2 ml-3'><a target={"_blank"} href='https://store.theyoungminds.org/'>Our Store</a></button>
        </div>
    </div>;
};

export default Hometemp;
