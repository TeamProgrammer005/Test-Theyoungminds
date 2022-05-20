import React from 'react'
import "./Nav.css"
// import { a } from "react-router-dom"
function Nav() {

    return (
        <>
            <div className="mobile_nav">
                {/* Mobile view top nav */}
                <ul>
                    <li><img src="image/young minds watermark 1.png" alt="logo" /></li>
                    <li><h2>The Young Minds</h2></li>
                </ul>
            </div>
            {/* Mobile view bottom nav for navigatiom */}
            <div className="mobileRouting">
                <ul className="mobileNav">
                <li><a href="/" activelassname='active' exact={true}><i className="fas fa-home "></i></a></li>
                    <li><a href="/community" activelassname='active'><i className="fas fa-users"></i></a></li>
                    <li><a href="/service" activeclassname='active'><i className="fas fa-business-time"></i></a></li>
                    <li><a href="/our_store" activeclassname='active'><i className="fas fa-shopping-bag"></i></a></li>
                    <li><a href="/about" activeclassname='active'><i className="fas fa-id-badge"></i></a></li>
                </ul>
            </div>
            {/* Desktop view for navigation */}
            <div className="navigation">
                <ul className="topNav">
                    <li><img src="image/young minds watermark 1.png" alt="logo" /></li>
                    <li><h2>THE YOUNG MINDS</h2></li>
                    <li></li>
                </ul>
                <ul className='mainNav'>
                    <li><a href="/" activelassname='active' exact={true} >Home</a></li>
                    <li><a href="/community" activelassname='active'>Our Community</a></li>
                    <li><a href="/service" activeclassname='active'>Services</a></li>
                    <li><a href="/our_store" activeclassname='active'>Our Store</a></li>
                    <li><a href="/about" activeclassname='active'>About Us</a></li>
                </ul>
                <div className='navblank'></div>
            </div>
        </>
    )
}

export default Nav
